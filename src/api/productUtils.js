import { mockProducts } from "../data/mockProducts";

const defaultImage =
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80";

export function normalizeProduct(product = {}) {
  const mockMatch = mockProducts.find((item) => String(item.id) === String(product.id));
  const image = product.imageUrl || mockMatch?.images?.[0] || defaultImage;
  const price = Number(product.price ?? mockMatch?.price ?? 0);
  const originalPrice = Number(product.originalPrice ?? mockMatch?.originalPrice ?? price);

  return {
    id: product.id ?? mockMatch?.id,
    name: product.name || mockMatch?.name || "AureumPicks Product",
    brand: product.brand || mockMatch?.brand || "AureumPicks",
    category: product.category || mockMatch?.category || "Collection",
    price,
    originalPrice,
    rating: Number(product.rating ?? mockMatch?.rating ?? 0),
    reviews: Number(product.reviews ?? mockMatch?.reviews ?? 0),
    badge: product.badge ?? mockMatch?.badge ?? null,
    description: product.description || mockMatch?.description || "",
    images: Array.isArray(product.images) && product.images.length ? product.images : [image],
    inStock: (product.stock ?? 1) > 0,
  };
}

export function getMockProductById(id) {
  return mockProducts.find((item) => String(item.id) === String(id)) || mockProducts[0];
}
