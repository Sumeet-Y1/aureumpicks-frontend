import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import ExclusiveBanner from "../components/home/ExclusiveBanner";
import FeaturedCollections from "../components/home/FeaturedCollections";
import BrandStory from "../components/home/BrandStory";
import Hero from "../components/home/Hero";
import ProductGrid from "../components/home/ProductGrid";
import PageWrapper from "../components/layout/PageWrapper";
import Loader from "../components/ui/Loader";
import { mockProducts } from "../data/mockProducts";

function normalizeProducts(products) {
  if (!Array.isArray(products)) {
    return mockProducts;
  }

  return products.map((product, index) => ({
    ...mockProducts[index % mockProducts.length],
    ...product,
    brand: product.brand || mockProducts[index % mockProducts.length].brand,
    originalPrice:
      product.originalPrice || Math.round(Number(product.price || 0) * 1.08) || mockProducts[index % mockProducts.length].originalPrice,
    reviews: product.reviews || mockProducts[index % mockProducts.length].reviews,
    images:
      Array.isArray(product.images) && product.images.length
        ? product.images
        : product.imageUrl
          ? [product.imageUrl, product.imageUrl, product.imageUrl, product.imageUrl]
          : mockProducts[index % mockProducts.length].images,
    badge: product.badge ?? mockProducts[index % mockProducts.length].badge,
  }));
}

function Home() {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const { data } = await api.get("/products/all");

        if (active && Array.isArray(data) && data.length) {
          setProducts(normalizeProducts(data));
        }
      } catch {
        toast.error("Live products unavailable. Showing the house edit instead.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="pt-0">
      <Hero />
      <FeaturedCollections />
      <ProductGrid products={products} />
      <ExclusiveBanner />
      <BrandStory />
    </PageWrapper>
  );
}

export default Home;
