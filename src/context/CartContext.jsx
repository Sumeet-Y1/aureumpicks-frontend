import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

export const CartContext = createContext(null);

const CART_KEY = "aureum_cart";
const WISHLIST_KEY = "aureum_wishlist";
const ORDERS_KEY = "aureum_orders";

function hasAuthToken() {
  return Boolean(localStorage.getItem("token"));
}

function normalizeCartItem(item = {}) {
  return {
    id: item.productId,
    cartId: item.id,
    name: item.productName,
    brand: "AureumPicks",
    category: "Collection",
    price: Number(item.productPrice ?? 0),
    quantity: Number(item.quantity ?? 1),
    selectedSize: "",
    images: [item.productImage || "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80"],
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const loadLocalCart = () => {
    setItems(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
  };

  const saveCart = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(CART_KEY, JSON.stringify(nextItems));
  };

  const loadRemoteCart = async () => {
    setCartLoading(true);

    try {
      const { data } = await api.get("/cart");
      setItems(Array.isArray(data) ? data.map(normalizeCartItem) : []);
    } catch {
      loadLocalCart();
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (hasAuthToken()) {
      loadRemoteCart();
    } else {
      loadLocalCart();
    }

    setWishlist(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"));
    setOrders(JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"));

    const handleAuthChanged = () => {
      if (hasAuthToken()) {
        loadRemoteCart();
      } else {
        loadLocalCart();
      }
    };

    window.addEventListener("auth-changed", handleAuthChanged);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
  }, []);

  const saveWishlist = (nextWishlist) => {
    setWishlist(nextWishlist);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextWishlist));
  };

  const saveOrders = (nextOrders) => {
    setOrders(nextOrders);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
  };

  const addToCart = async (product, quantity = 1, selectedSize = "") => {
    if (hasAuthToken()) {
      try {
        await api.post("/cart/add", { productId: product.id, quantity });
        await loadRemoteCart();
        toast.success("Added to cart.");
        return;
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to add this item right now.";
        toast.error(message);
        return;
      }
    }

    const existing = items.find((item) => item.id === product.id && item.selectedSize === selectedSize);
    let nextItems;

    if (existing) {
      nextItems = items.map((item) =>
        item.id === product.id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      nextItems = [...items, { ...product, quantity, selectedSize }];
    }

    saveCart(nextItems);
    toast.success("Added to cart.");
  };

  const removeFromCart = async (id, selectedSize = "") => {
    if (hasAuthToken()) {
      const cartItem = items.find((item) => item.id === id);

      if (!cartItem?.cartId) {
        return;
      }

      try {
        await api.delete(`/cart/remove/${cartItem.cartId}`);
        await loadRemoteCart();
        toast.success("Removed from cart.");
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to remove this item right now.";
        toast.error(message);
      }

      return;
    }

    const nextItems = items.filter(
      (item) => !(item.id === id && item.selectedSize === selectedSize),
    );
    saveCart(nextItems);
    toast.success("Removed from cart.");
  };

  const updateQuantity = async (id, quantity, selectedSize = "") => {
    if (quantity <= 0) {
      await removeFromCart(id, selectedSize);
      return;
    }

    if (hasAuthToken()) {
      const cartItem = items.find((item) => item.id === id);

      if (!cartItem?.cartId) {
        return;
      }

      try {
        await api.put(`/cart/update/${cartItem.cartId}`, null, {
          params: { quantity },
        });
        await loadRemoteCart();
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to update the cart right now.";
        toast.error(message);
      }

      return;
    }

    const nextItems = items.map((item) =>
      item.id === id && item.selectedSize === selectedSize ? { ...item, quantity } : item,
    );
    saveCart(nextItems);
  };

  const clearCart = async () => {
    if (hasAuthToken()) {
      try {
        await api.delete("/cart/clear");
      } catch {
        // Keep the UI moving even if the server is temporarily unavailable.
      }
    }

    saveCart([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    const nextWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    saveWishlist(nextWishlist);
    toast.success(exists ? "Removed from wishlist." : "Saved to wishlist.");
  };

  const placeOrder = async (payload) => {
    const order = {
      id: `AUR-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      status: "Processing",
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items,
      shipping: payload,
    };

    const nextOrders = [order, ...orders];
    saveOrders(nextOrders);
    await clearCart();
    toast.success("Order placed successfully.");
    return { success: true, order };
  };

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      wishlist,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      placeOrder,
      cartTotal,
      cartCount,
      cartLoading,
      wishlistCount: wishlist.length,
    }),
    [cartCount, cartLoading, cartTotal, items, orders, wishlist],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
