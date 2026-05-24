import { motion } from "framer-motion";

function Button({
  children,
  variant = "primary",
  className = "",
  as: Component = "button",
  ...props
}) {
  const variants = {
    primary: "bg-gold px-8 py-3 text-xs uppercase tracking-[0.32em] text-black hover:bg-goldlight",
    secondary:
      "border border-gold px-8 py-3 text-xs uppercase tracking-[0.32em] text-gold hover:bg-gold hover:text-black",
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Component
        className={`inline-flex items-center justify-center gap-2 transition-all duration-300 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}

export default Button;
