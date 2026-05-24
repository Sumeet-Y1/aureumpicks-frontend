import { motion } from "framer-motion";

function PageWrapper({ children, className = "" }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`pt-24 ${className}`}
    >
      {children}
    </motion.main>
  );
}

export default PageWrapper;
