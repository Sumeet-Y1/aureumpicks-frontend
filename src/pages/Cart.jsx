import { ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

function Cart() {
  const { items, cartTotal, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const shipping = cartTotal > 10000 ? 0 : 1200;

  if (!items.length) {
    return (
      <PageWrapper>
        <section className="section-space">
          <div className="container-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
            <ShoppingBag size={40} className="text-gold" />
            <h1 className="mt-6 font-serif text-5xl tracking-wide text-white">Your cart is empty</h1>
            <p className="mt-4 max-w-xl text-base font-light leading-8 text-muted">
              The collection is waiting. Explore the house edit and add something exceptional.
            </p>
            <div className="mt-8">
              <Button as={Link} to="/shop" variant="primary">
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="grid gap-5 border border-border bg-darkgray p-5 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                <img src={item.images[0]} alt={item.name} className="aspect-[3/4] w-full object-cover sm:w-32" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{item.category}</p>
                  <h2 className="mt-3 font-serif text-2xl tracking-wide text-white">{item.name}</h2>
                  <p className="mt-2 text-sm font-light text-muted">{item.brand}</p>
                  {item.selectedSize ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-muted">Size {item.selectedSize}</p>
                  ) : null}
                  <p className="mt-4 text-base font-medium text-gold">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col items-start gap-4 sm:items-end">
                  <div className="inline-flex items-center border border-border">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)} className="px-4 py-3 text-white">
                      -
                    </button>
                    <span className="px-4 text-sm text-white">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)} className="px-4 py-3 text-white">
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted transition hover:text-gold"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit border border-gold/20 bg-darkgray p-8 xl:sticky xl:top-28">
            <h2 className="font-serif text-3xl tracking-wide text-white">Order Summary</h2>
            <div className="mt-8 space-y-4 text-sm font-light text-muted">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-base">
                  <span className="text-white">Total</span>
                  <span className="font-medium text-gold">{formatPrice(cartTotal + shipping)}</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => navigate(isAuthenticated ? "/checkout" : "/login")}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Cart;
