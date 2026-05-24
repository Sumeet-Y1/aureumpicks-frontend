import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/axios";
import { normalizeProduct } from "../api/productUtils";
import PageWrapper from "../components/layout/PageWrapper";
import ProductCard from "../components/ui/ProductCard";
import SectionHeading from "../components/ui/SectionHeading";
import { mockProducts } from "../data/mockProducts";

const categories = [
  "All",
  "Watches",
  "Fragrances",
  "Jewelry",
  "Fashion",
  "Sneakers",
  "Leather Goods",
  "Accessories",
];

function Shop() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnecting, setShowConnecting] = useState(false);

  useEffect(() => {
    let active = true;
    const connectingTimer = window.setTimeout(() => {
      if (active) {
        setShowConnecting(true);
      }
    }, 3000);

    async function loadProducts() {
      setIsLoading(true);
      setShowConnecting(false);

      try {
        const endpoint =
          selectedCategory === "All"
            ? "/products/all"
            : `/products/category/${encodeURIComponent(selectedCategory)}`;
        const { data } = await api.get(endpoint);

        if (!active) {
          return;
        }

        setProducts(Array.isArray(data) ? data.map(normalizeProduct) : mockProducts);
      } catch {
        if (active) {
          setProducts(mockProducts);
        }
      } finally {
        if (active) {
          setIsLoading(false);
          setShowConnecting(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
      window.clearTimeout(connectingTimer);
    };
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (minPrice) {
      list = list.filter((product) => product.price >= Number(minPrice));
    }

    if (maxPrice) {
      list = list.filter((product) => product.price <= Number(maxPrice));
    }

    switch (sortBy) {
      case "Price Low-High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price High-Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return list;
  }, [maxPrice, minPrice, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 12));
  const visibleProducts = filteredProducts.slice((currentPage - 1) * 12, currentPage * 12);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSortBy("Featured");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  return (
    <PageWrapper>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="The Collection"
            title="A focused luxury assortment"
            description={`${filteredProducts.length} products curated across the house categories.`}
          />

          <div className="mt-14 flex flex-col gap-10 lg:flex-row">
            <aside className="w-full border border-border bg-darkgray p-6 lg:w-64 lg:self-start">
              <div>
                <p className="font-serif text-2xl tracking-wide text-white">Categories</p>
                <div className="mt-6 space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 text-sm font-light text-muted">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                        className="h-4 w-4 border-border bg-black text-gold focus:ring-gold"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <p className="font-serif text-2xl tracking-wide text-white">Price Range</p>
                <div className="mt-6 space-y-3">
                  <input
                    className="input-luxury"
                    placeholder="Minimum"
                    value={minPrice}
                    onChange={(event) => {
                      setMinPrice(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <input
                    className="input-luxury"
                    placeholder="Maximum"
                    value={maxPrice}
                    onChange={(event) => {
                      setMaxPrice(event.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="mt-10">
                <p className="font-serif text-2xl tracking-wide text-white">Sort By</p>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="input-luxury mt-6"
                >
                  <option>Featured</option>
                  <option>Price Low-High</option>
                  <option>Price High-Low</option>
                  <option>Newest</option>
                </select>
              </div>

              <button type="button" onClick={clearFilters} className="mt-8 text-xs uppercase tracking-[0.28em] text-gold">
                Clear Filters
              </button>
            </aside>

            <div className="flex-1">
              {isLoading && showConnecting ? (
                <p className="mb-6 text-sm font-light text-muted">Connecting to server...</p>
              ) : null}

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  className="border border-border px-4 py-3 text-white disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                <p className="text-xs uppercase tracking-[0.28em] text-muted">
                  Page {currentPage} of {totalPages}
                </p>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  className="border border-border px-4 py-3 text-white disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Shop;
