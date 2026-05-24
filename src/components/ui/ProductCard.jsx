import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import Badge from "./Badge";
import Button from "./Button";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden border border-border bg-darkgray"
    >
      <div className="absolute left-4 top-4 z-10">
        <Badge>{product.badge}</Badge>
      </div>

      <button
        type="button"
        onClick={() => toggleWishlist(product)}
        className="absolute right-4 top-4 z-10 border border-gold/20 bg-black/80 p-2 text-gold transition hover:bg-gold hover:text-black"
      >
        <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40" />
        </div>
      </Link>

      <div className="space-y-3 p-6">
        <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{product.category}</p>
        <div>
          <Link to={`/product/${product.id}`} className="font-serif text-2xl tracking-wide text-white">
            {product.name}
          </Link>
          <p className="mt-2 text-sm font-light text-muted">{product.brand}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-base font-medium text-gold">{formatPrice(product.price)}</p>
          <p className="text-sm font-light text-muted line-through">
            {formatPrice(product.originalPrice)}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute inset-x-0 bottom-0 border-t border-gold/20 bg-black/90 p-4"
      >
        <Button
          variant="primary"
          className="w-full"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={14} />
          Add to Cart
        </Button>
      </motion.div>
    </motion.article>
  );
}

export default ProductCard;
