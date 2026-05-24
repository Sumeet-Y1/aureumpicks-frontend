import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const tabs = ["Profile", "Orders", "Wishlist", "Settings"];

function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Profile");
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setProfileForm({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
  }, [user]);

  const initials = (user?.fullName || "AP")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell">
          <div className="border border-gold/20 bg-darkgray p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center border border-gold text-2xl font-serif text-gold">
                  {initials}
                </div>
                <div>
                  <h1 className="font-serif text-4xl tracking-wide text-white">{user?.fullName || "Aureum Member"}</h1>
                  <p className="mt-2 text-sm font-light text-muted">{user?.email}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">
                    Member since {new Date(user?.memberSince || Date.now()).getFullYear()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === "Orders") navigate("/orders");
                      if (tab === "Wishlist") navigate("/wishlist");
                    }}
                    className={`border px-5 py-3 text-xs uppercase tracking-[0.28em] ${
                      activeTab === tab ? "border-gold text-gold" : "border-border text-muted"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "Profile" ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  updateProfile(profileForm);
                }}
                className="mt-10 grid gap-4 md:grid-cols-2"
              >
                <input className="input-luxury" value={profileForm.fullName} onChange={(event) => setProfileForm((current) => ({ ...current, fullName: event.target.value }))} placeholder="Full name" />
                <input className="input-luxury" value={profileForm.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} placeholder="Email" />
                <input className="input-luxury" value={profileForm.phone} onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))} placeholder="Phone" />
                <input className="input-luxury" value={profileForm.address} onChange={(event) => setProfileForm((current) => ({ ...current, address: event.target.value }))} placeholder="Address" />
                <div className="md:col-span-2">
                  <Button variant="primary" type="submit">
                    Save Profile
                  </Button>
                </div>
              </form>
            ) : null}

            {activeTab === "Settings" ? (
              <form className="mt-10 grid gap-4 md:grid-cols-2">
                <input className="input-luxury" placeholder="Current password" type="password" />
                <input className="input-luxury" placeholder="New password" type="password" />
                <input className="input-luxury md:col-span-2" placeholder="Confirm new password" type="password" />
                <div className="md:col-span-2">
                  <Button variant="secondary" type="button">
                    Change Password
                  </Button>
                </div>
              </form>
            ) : null}

            <div className="mt-10">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Profile;
