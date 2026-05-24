import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";
import { useCart } from "../hooks/useCart";

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (!wishlist.length) {
    return (
      <PageWrapper>
        <section className="section-space">
          <div className="container-shell border border-border bg-darkgray p-12 text-center">
            <h1 className="font-serif text-5xl tracking-wide text-white">Your wishlist is empty</h1>
            <p className="mt-4 text-base font-light leading-8 text-muted">
              Save the pieces you want to return to later.
            </p>
            <div className="mt-8">
              <Button as={Link} to="/shop" variant="primary">
                Explore the Collection
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
        <div className="container-shell">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Saved Pieces</p>
              <h1 className="mt-4 font-serif text-5xl tracking-wide text-white">Your Wishlist</h1>
            </div>
            <p className="text-sm font-light text-muted">{wishlist.length} items</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((product) => (
              <div key={product.id} className="space-y-4">
                <ProductCard product={product} />
                <div className="flex gap-4">
                  <Button variant="primary" className="flex-1" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={() => toggleWishlist(product)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Wishlist;
