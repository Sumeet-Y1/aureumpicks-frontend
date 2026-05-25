import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

function VerifyEmail() {
  const navigate = useNavigate();
  const { verifyEmail, resendOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const pendingEmail = useMemo(
    () => localStorage.getItem("pendingSignupEmail") || "",
    [],
  );

  const handleVerify = async (event) => {
    event.preventDefault();

    const result = await verifyEmail(pendingEmail, otp);

    if (result.success) {
      navigate("/login");
    }
  };

  const handleResend = async () => {
    await resendOtp(pendingEmail);
  };

  return (
    <PageWrapper>
      <section className="min-h-[calc(100vh-6rem)]">
        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-darkgray px-6 py-16">
          <form onSubmit={handleVerify} className="w-full max-w-md border border-border bg-black p-8 sm:p-10">
            <h1 className="font-serif text-5xl tracking-wide text-white">Verify Email</h1>
            <p className="mt-4 text-sm font-light text-muted">
              We&apos;ve sent a verification code to {pendingEmail || "your email"}.
            </p>
            <div className="mt-8 space-y-4">
              <input
                className="input-luxury"
                placeholder="6-digit code"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                required
              />
            </div>
            <div className="mt-8 space-y-4">
              <Button variant="primary" className="w-full" type="submit">
                Verify
              </Button>
              <Button variant="secondary" className="w-full" type="button" onClick={handleResend}>
                Resend Code
              </Button>
            </div>
            <p className="mt-6 text-center text-sm font-light text-muted">
              Back to{" "}
              <Link to="/login" className="text-gold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}

export default VerifyEmail;
