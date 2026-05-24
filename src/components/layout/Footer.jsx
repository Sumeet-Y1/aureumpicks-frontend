import { ArrowRight, Instagram, Pin, Twitter } from "lucide-react";
import Button from "../ui/Button";

function Footer() {
  return (
    <footer className="mt-20 border-t border-gold/20 bg-darkgray">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-[0.32em] text-gold">AUREUM</span>
            <span className="text-sm uppercase tracking-[0.3em] text-white">PICKS</span>
          </div>
          <p className="mt-6 max-w-sm text-sm font-light leading-7 text-muted">
            Curated fashion, leather, fragrance, and objects of distinction for those who prefer refinement over noise.
          </p>
          <div className="mt-6 flex gap-4 text-muted">
            <a href="https://instagram.com" aria-label="Instagram" className="transition hover:text-gold">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="transition hover:text-gold">
              <Twitter size={18} />
            </a>
            <a href="https://pinterest.com" aria-label="Pinterest" className="transition hover:text-gold">
              <Pin size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="font-serif text-2xl tracking-wide text-white">Shop</p>
          <div className="mt-6 space-y-3 text-sm font-light text-muted">
            <a href="/shop">New Arrivals</a>
            <a href="/shop">Watches</a>
            <a href="/shop">Jewelry</a>
            <a href="/shop">Leather Goods</a>
          </div>
        </div>

        <div>
          <p className="font-serif text-2xl tracking-wide text-white">Help</p>
          <div className="mt-6 space-y-3 text-sm font-light text-muted">
            <a href="/profile">My Account</a>
            <a href="/orders">Orders</a>
            <a href="/wishlist">Wishlist</a>
            <a href="/cart">Shipping & Returns</a>
          </div>
        </div>

        <div>
          <p className="font-serif text-2xl tracking-wide text-white">Newsletter</p>
          <p className="mt-6 text-sm font-light leading-7 text-muted">
            Private drops, seasonal edits, and access to rare releases.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <input className="input-luxury" placeholder="Your email address" />
            <Button variant="secondary" className="w-full">
              Subscribe <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col gap-4 py-5 text-xs uppercase tracking-[0.22em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AureumPicks</p>
          <div className="flex gap-6">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
