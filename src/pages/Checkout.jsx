import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, placeOrder } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const shipping = cartTotal > 10000 ? 0 : 1200;

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await placeOrder(form);

    if (result?.success) {
      navigate("/orders");
    }
  };

  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell grid gap-10 xl:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="border border-border bg-darkgray p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Shipping</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input className="input-luxury md:col-span-2" placeholder="Full name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
                <input className="input-luxury" placeholder="Email address" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
                <input className="input-luxury" placeholder="Phone number" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
                <input className="input-luxury md:col-span-2" placeholder="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} required />
                <input className="input-luxury" placeholder="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} required />
                <input className="input-luxury" placeholder="Postal code" value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} required />
              </div>
            </div>

            <div className="border border-border bg-darkgray p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Payment</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <input className="input-luxury md:col-span-2" placeholder="Card number" value={form.cardNumber} onChange={(event) => updateField("cardNumber", event.target.value)} required />
                <input className="input-luxury" placeholder="Expiry" value={form.expiry} onChange={(event) => updateField("expiry", event.target.value)} required />
                <input className="input-luxury" placeholder="CVV" value={form.cvv} onChange={(event) => updateField("cvv", event.target.value)} required />
              </div>
            </div>

            <div className="border border-border bg-darkgray p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Confirm</p>
              <p className="mt-4 text-sm font-light leading-7 text-muted">
                Review your information carefully. Your order will be handled with insured shipping and white-glove support.
              </p>
              <div className="mt-8">
                <Button variant="primary" className="w-full" type="submit">
                  Place Order
                </Button>
              </div>
            </div>
          </form>

          <div className="h-fit border border-gold/20 bg-darkgray p-8 xl:sticky xl:top-28">
            <h2 className="font-serif text-3xl tracking-wide text-white">Order Summary</h2>
            <div className="mt-8 space-y-5">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-serif text-xl tracking-wide text-white">{item.name}</p>
                    <p className="mt-1 text-sm font-light text-muted">
                      Qty {item.quantity}{item.selectedSize ? ` · ${item.selectedSize}` : ""}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4 text-sm font-light text-muted">
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
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Checkout;
