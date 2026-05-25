import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const result = await register(form);

    if (result.success) {
      navigate("/verify-email");
    }
  };

  return (
    <PageWrapper>
      <section className="min-h-[calc(100vh-6rem)]">
        <div className="grid min-h-[calc(100vh-6rem)] lg:grid-cols-2">
          <div className="relative hidden border-r border-border bg-black lg:flex">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
              alt="AureumPicks editorial"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="relative z-10 flex flex-col justify-between p-12">
              <div>
                <p className="font-serif text-5xl tracking-[0.32em] text-gold">AUREUM</p>
                <p className="mt-2 text-sm uppercase tracking-[0.32em] text-white">PICKS</p>
              </div>
              <blockquote className="max-w-xl font-serif text-4xl font-normal leading-tight tracking-wide text-white">
                "A private club for exceptional taste."
              </blockquote>
            </div>
          </div>

          <div className="flex items-center justify-center bg-darkgray px-6 py-16">
            <form onSubmit={handleSubmit} className="w-full max-w-md border border-border bg-black p-8 sm:p-10">
              <h1 className="font-serif text-5xl tracking-wide text-white">Create Account</h1>
              <p className="mt-4 text-sm font-light text-muted">
                Begin your AureumPicks experience
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <input className="input-luxury" placeholder="First name" value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} required />
                <input className="input-luxury" placeholder="Last name" value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} required />
                <input className="input-luxury sm:col-span-2" placeholder="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
                <input className="input-luxury sm:col-span-2" placeholder="Password" type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} required />
                <input className="input-luxury sm:col-span-2" placeholder="Confirm password" type="password" value={form.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} required />
              </div>
              <div className="mt-8">
                <Button variant="primary" className="w-full" type="submit">
                  Create Account
                </Button>
              </div>
              <p className="mt-6 text-center text-sm font-light text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-gold">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Register;
