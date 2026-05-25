import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

function ForgotPassword() {
  const navigate = useNavigate();
  const { requestPasswordReset, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const handleSendCode = async (event) => {
    event.preventDefault();
    const result = await requestPasswordReset(email);

    if (result.success) {
      setShowResetForm(true);
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const result = await resetPassword(email, otp, newPassword);

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <PageWrapper>
      <section className="min-h-[calc(100vh-6rem)]">
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-darkgray px-6 py-16">
          <form onSubmit={showResetForm ? handleReset : handleSendCode} className="w-full max-w-md border border-border bg-black p-8 sm:p-10">
            <h1 className="font-serif text-5xl tracking-wide text-white">Reset Password</h1>
            <p className="mt-4 text-sm font-light text-muted">
              Enter your email to receive a reset code.
            </p>
            <div className="mt-8 space-y-4">
              <input
                className="input-luxury"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              {showResetForm ? (
                <>
                  <input
                    className="input-luxury"
                    placeholder="Verification code"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    required
                  />
                  <input
                    className="input-luxury"
                    placeholder="New password"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    required
                  />
                </>
              ) : null}
            </div>
            <div className="mt-8">
              <Button variant="primary" className="w-full" type="submit">
                {showResetForm ? "Reset Password" : "Send Reset Code"}
              </Button>
            </div>
            <p className="mt-6 text-center text-sm font-light text-muted">
              <Link to="/login" className="text-gold">
                Back to Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}

export default ForgotPassword;
