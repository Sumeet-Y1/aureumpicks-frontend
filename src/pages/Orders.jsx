import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

function Orders() {
  const { orders } = useCart();

  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell">
          <h1 className="font-serif text-5xl tracking-wide text-white">Your Orders</h1>

          {orders.length ? (
            <div className="mt-10 space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border border-border bg-darkgray p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-gold">Order {order.id}</p>
                      <p className="mt-3 font-serif text-2xl tracking-wide text-white">
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 lg:items-end">
                      <span className="inline-flex border border-gold/20 px-4 py-2 text-xs uppercase tracking-[0.28em] text-gold">
                        {order.status}
                      </span>
                      <p className="text-base font-medium text-white">{formatPrice(order.total)}</p>
                      <Link to="/profile" className="text-xs uppercase tracking-[0.28em] text-muted transition hover:text-gold">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-border bg-darkgray p-12 text-center">
              <h2 className="font-serif text-4xl tracking-wide text-white">No orders yet</h2>
              <p className="mt-4 text-base font-light leading-8 text-muted">
                The first piece you choose will appear here with live order status.
              </p>
              <div className="mt-8">
                <Button as={Link} to="/shop" variant="primary">
                  Shop the Collection
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

export default Orders;
