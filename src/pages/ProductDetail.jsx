import { Minus, Plus, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { getMockProductById, normalizeProduct } from "../api/productUtils";
import PageWrapper from "../components/layout/PageWrapper";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProductCard from "../components/ui/ProductCard";
import { mockProducts } from "../data/mockProducts";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatPrice";

const sizesByCategory = {
  Fashion: ["S", "M", "L", "XL"],
  Sneakers: ["40", "41", "42", "43", "44"],
};

function Accordion({ title, children }) {
  const [open, setOpen] = useState(title === "Description");

  return (
    <div className="border-b border-border py-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between font-serif text-xl tracking-wide text-white"
      >
        {title}
        <span className="text-gold">{open ? "−" : "+"}</span>
      </button>
      {open ? <div className="mt-4 text-sm font-light leading-7 text-muted">{children}</div> : null}
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist } = useCart();
  const [product, setProduct] = useState(() => getMockProductById(id));
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizesByCategory[product.category]?.[0] || "");
  const [isLoading, setIsLoading] = useState(true);
  const [showConnecting, setShowConnecting] = useState(false);

  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedSize(sizesByCategory[product.category]?.[0] || "");
  }, [product]);

  useEffect(() => {
    let active = true;
    const fallbackProduct = getMockProductById(id);
    const connectingTimer = window.setTimeout(() => {
      if (active) {
        setShowConnecting(true);
      }
    }, 3000);

    async function loadProduct() {
      setIsLoading(true);
      setShowConnecting(false);

      try {
        const { data } = await api.get(`/products/${id}`);
        const normalizedProduct = normalizeProduct(data);

        if (!active) {
          return;
        }

        setProduct(normalizedProduct);

        try {
          const relatedResponse = await api.get(
            `/products/category/${encodeURIComponent(normalizedProduct.category)}`,
          );

          if (active) {
            setRelatedProducts(
              Array.isArray(relatedResponse.data)
                ? relatedResponse.data
                    .map(normalizeProduct)
                    .filter((item) => item.id !== normalizedProduct.id)
                    .slice(0, 4)
                : [],
            );
          }
        } catch {
          if (active) {
            setRelatedProducts(
              mockProducts
                .filter((item) => item.category === normalizedProduct.category && item.id !== normalizedProduct.id)
                .slice(0, 4),
            );
          }
        }
      } catch {
        if (active) {
          setProduct(fallbackProduct);
          setRelatedProducts(
            mockProducts
              .filter((item) => item.category === fallbackProduct.category && item.id !== fallbackProduct.id)
              .slice(0, 4),
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
          setShowConnecting(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
      window.clearTimeout(connectingTimer);
    };
  }, [id]);

  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell">
          {isLoading && showConnecting ? (
            <p className="mb-6 text-sm font-light text-muted">Connecting to server...</p>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="overflow-hidden border border-border bg-charcoal">
                <img src={activeImage} alt={product.name} className="aspect-[4/5] w-full object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden border ${activeImage === image ? "border-gold" : "border-border"} bg-charcoal`}
                  >
                    <img src={image} alt={product.name} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Badge>{product.category}</Badge>
              <h1 className="mt-5 font-serif text-4xl tracking-wide text-white">{product.name}</h1>
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-muted">{product.brand}</p>
              <div className="mt-5 flex items-center gap-3 text-sm text-white">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill={index < Math.round(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="font-light text-muted">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="mt-6 text-3xl font-medium text-gold">{formatPrice(product.price)}</p>
              <div className="mt-8 border-t border-border pt-8">
                <p className="max-w-xl text-base font-light leading-8 text-muted">{product.description}</p>
              </div>

              {sizesByCategory[product.category] ? (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-white">Size</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {sizesByCategory[product.category].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`border px-4 py-3 text-sm ${selectedSize === size ? "border-gold text-gold" : "border-border text-muted"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.28em] text-white">Quantity</p>
                <div className="mt-4 inline-flex items-center border border-border">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="px-4 py-3 text-white">
                    <Minus size={16} />
                  </button>
                  <span className="px-5 text-sm text-white">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => value + 1)} className="px-4 py-3 text-white">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="primary"
                  className="w-full sm:w-auto"
                  onClick={() => addToCart(product, quantity, selectedSize)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={() => toggleWishlist(product)}
                >
                  Add to Wishlist
                </Button>
              </div>

              <p className="mt-8 text-sm font-light text-muted">
                Complimentary shipping on orders above ₹10,000
              </p>

              <div className="mt-10">
                <Accordion title="Description">{product.description}</Accordion>
                <Accordion title="Details & Care">
                  Crafted with premium materials. Store in a cool dry place and handle according to the brand’s care guidance.
                </Accordion>
                <Accordion title="Shipping & Returns">
                  Complimentary insured delivery. Easy return requests available within 7 days on eligible pieces.
                </Accordion>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="font-serif text-4xl tracking-wide text-white">You May Also Like</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default ProductDetail;
