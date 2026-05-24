import Button from "../ui/Button";
import ProductCard from "../ui/ProductCard";
import SectionHeading from "../ui/SectionHeading";

function ProductGrid({ products }) {
  return (
    <section className="section-space border-b border-border bg-darkgray">
      <div className="container-shell">
        <SectionHeading
          eyebrow="New Arrivals"
          title="The season's most coveted pieces"
          description="Selected to balance statement, craft, and long-term desirability."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button as="a" href="/shop" variant="secondary">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
