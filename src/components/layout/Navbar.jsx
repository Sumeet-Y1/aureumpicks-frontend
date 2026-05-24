import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/shop?filter=collections" },
  { label: "About", to: "/#about" },
];

function CountBubble({ count }) {
  if (!count) {
    return null;
  }

  return (
    <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[10px] text-black">
      {count}
    </span>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cartCount, wishlistCount } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
          scrolled ? "border-border bg-black/80" : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-shell flex h-20 items-center justify-between gap-6">
          <NavLink to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-[0.32em] text-gold">AUREUM</span>
            <span className="text-sm uppercase tracking-[0.3em] text-white">PICKS</span>
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) =>
              link.label === "About" ? (
                <a
                  key={link.label}
                  href={link.to}
                  className="relative text-sm font-light text-white transition hover:text-gold"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `relative text-sm font-light text-white transition ${isActive ? "text-gold" : "hover:text-gold"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive ? <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" /> : null}
                    </>
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <button type="button" className="text-white transition hover:text-gold" aria-label="Search">
              <Search size={18} />
            </button>
            <NavLink to="/wishlist" className="relative text-white transition hover:text-gold" aria-label="Wishlist">
              <Heart size={18} />
              <CountBubble count={wishlistCount} />
            </NavLink>
            <NavLink to="/cart" className="relative text-white transition hover:text-gold" aria-label="Cart">
              <ShoppingBag size={18} />
              <CountBubble count={cartCount} />
            </NavLink>
            <NavLink
              to={isAuthenticated ? "/profile" : "/login"}
              className="text-white transition hover:text-gold"
              aria-label="Account"
            >
              <User size={18} />
            </NavLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-white transition hover:text-gold lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={mobileOpen ? { x: 0 } : { x: "100%" }}
        transition={{ duration: 0.35 }}
        className="fixed inset-y-0 right-0 z-[60] w-full max-w-sm border-l border-border bg-black p-6 lg:hidden"
      >
        <div className="flex items-center justify-between">
          <p className="font-serif text-2xl tracking-wide text-gold">Menu</p>
          <button type="button" onClick={() => setMobileOpen(false)} className="text-white" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        <div className="mt-12 space-y-6">
          {links.map((link) =>
            link.label === "About" ? (
              <a
                key={link.label}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className="block font-serif text-3xl tracking-wide text-white"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block font-serif text-3xl tracking-wide text-white"
              >
                {link.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <NavLink
            to="/wishlist"
            onClick={() => setMobileOpen(false)}
            className="panel flex items-center justify-between px-4 py-4"
          >
            Wishlist <span className="text-gold">{wishlistCount}</span>
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className="panel flex items-center justify-between px-4 py-4"
          >
            Cart <span className="text-gold">{cartCount}</span>
          </NavLink>
          <NavLink
            to={isAuthenticated ? "/profile" : "/login"}
            onClick={() => setMobileOpen(false)}
            className="panel col-span-2 flex items-center justify-between px-4 py-4"
          >
            {isAuthenticated ? "My Account" : "Sign In"}
            <User size={16} className="text-gold" />
          </NavLink>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
