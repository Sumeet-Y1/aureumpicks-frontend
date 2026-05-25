import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

export const AuthContext = createContext(null);

const USER_KEY = "user";
const TOKEN_KEY = "token";

function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}

function deriveUser(seed = {}, token = "") {
  const decoded = token ? decodeJwt(token) : {};
  const email = seed.email || decoded.email || decoded.sub || "";
  const fullName =
    seed.fullName ||
    decoded.fullName ||
    decoded.name ||
    [seed.firstName, seed.lastName].filter(Boolean).join(" ").trim() ||
    (email ? email.split("@")[0].replace(/[._-]/g, " ") : "Aureum Member");

  return {
    email,
    fullName,
    phone: seed.phone || "",
    address: seed.address || "",
    memberSince: seed.memberSince || new Date().toISOString(),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      return;
    }

    if (storedToken) {
      const restoredUser = deriveUser({}, storedToken);
      setUser(restoredUser);
      localStorage.setItem(USER_KEY, JSON.stringify(restoredUser));
    }
  }, []);

  const persist = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    localStorage.setItem(TOKEN_KEY, nextToken);
    window.dispatchEvent(new Event("auth-changed"));
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      const nextUser = deriveUser(data.user || { email: data.email || email }, data.token);
      persist(nextUser, data.token);
      toast.success("Welcome back to AureumPicks.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to sign in right now.";
      toast.error(message);
      return { success: false, message };
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await api.post("/auth/signup", {
        email: payload.email,
        password: payload.password,
      });
      localStorage.setItem("pendingSignupEmail", payload.email);
      localStorage.setItem("pendingSignupUser", JSON.stringify(payload));
      toast.success(data.message || "Account created. Verify your email to continue.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration could not be completed.";
      toast.error(message);
      return { success: false, message };
    }
  };

  const verifyEmail = async (email, otp) => {
    try {
      const { data } = await api.post("/auth/verify-email", { email, otp });
      toast.success(data.message || "Email verified successfully.");
      localStorage.removeItem("pendingSignupEmail");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Email verification failed.";
      toast.error(message);
      return { success: false, message };
    }
  };

  const resendOtp = async (email) => {
    try {
      const { data } = await api.post("/auth/resend-otp", { email });
      toast.success(data.message || "Verification code resent.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to resend code.";
      toast.error(message);
      return { success: false, message };
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      toast.success(data.message || "Reset code sent.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to send reset code.";
      toast.error(message);
      return { success: false, message };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const { data } = await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success(data.message || "Password reset successfully.");
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || "Password reset failed.";
      toast.error(message);
      return { success: false, message };
    }
  };

  const updateProfile = (updates) => {
    const nextUser = { ...user, ...updates };
    setUser(nextUser);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    toast.success("Profile updated.");
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event("auth-changed"));
    toast.success("Signed out.");
    window.location.href = "/login";
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      register,
      verifyEmail,
      resendOtp,
      requestPasswordReset,
      resetPassword,
      logout,
      updateProfile,
      isAuthenticated: Boolean(token),
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
