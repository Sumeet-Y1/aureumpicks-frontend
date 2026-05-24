import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="h-14 w-14 border border-gold border-t-transparent"
        />
        <p className="font-serif text-2xl tracking-wide text-white">
          Loading the collection
        </p>
      </div>
    </div>
  );
}

export default Loader;
