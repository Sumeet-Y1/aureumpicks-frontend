import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      navigate("/profile");
    }
  };

  return (
    <PageWrapper>
      <section className="min-h-[calc(100vh-6rem)]">
        <div className="grid min-h-[calc(100vh-6rem)] lg:grid-cols-2">
          <div className="relative hidden border-r border-border bg-black lg:flex">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
              alt="AureumPicks quote"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="relative z-10 flex flex-col justify-between p-12">
              <div>
                <p className="font-serif text-5xl tracking-[0.32em] text-gold">AUREUM</p>
                <p className="mt-2 text-sm uppercase tracking-[0.32em] text-white">PICKS</p>
              </div>
              <blockquote className="max-w-xl font-serif text-4xl font-normal leading-tight tracking-wide text-white">
                "Luxury begins where haste ends."
              </blockquote>
            </div>
          </div>

          <div className="flex items-center justify-center bg-darkgray px-6 py-16">
            <form onSubmit={handleSubmit} className="w-full max-w-md border border-border bg-black p-8 sm:p-10">
              <h1 className="font-serif text-5xl tracking-wide text-white">Welcome Back</h1>
              <p className="mt-4 text-sm font-light text-muted">
                Sign in to your AureumPicks account
              </p>
              <div className="mt-8 space-y-4">
                <input className="input-luxury" placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                <input className="input-luxury" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </div>
              <div className="mt-4 text-right">
                <a href="/forgot-password" className="text-xs uppercase tracking-[0.24em] text-gold">
                  Forgot Password?
                </a>
              </div>
              <div className="mt-8">
                <Button variant="primary" className="w-full" type="submit">
                  Sign In
                </Button>
              </div>
              <p className="mt-6 text-center text-sm font-light text-muted">- or -</p>
              <p className="mt-6 text-center text-sm font-light text-muted">
                <Link to="/register" className="text-gold">
                  Create an Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Login;
