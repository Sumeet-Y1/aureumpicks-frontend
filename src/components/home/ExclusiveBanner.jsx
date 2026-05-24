import { motion } from "framer-motion";
import Button from "../ui/Button";

function ExclusiveBanner() {
  return (
    <section className="section-space border-b border-border bg-black">
      <div className="container-shell">
        <div className="grid min-h-[60vh] overflow-hidden border border-gold/20 bg-darkgray lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-h-[24rem]"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80"
              alt="Noir Signature Collection"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center p-8 sm:p-12"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Limited Edition</p>
              <h2 className="mt-6 font-serif text-4xl tracking-wide text-white sm:text-5xl">
                The Noir Signature Collection
              </h2>
              <p className="mt-6 max-w-xl text-base font-light leading-8 text-muted">
                A capsule of dark tailoring, gold hardware, and tactile leather made for evenings where every detail matters.
              </p>
              <div className="mt-8">
                <Button as="a" href="/shop" variant="primary">
                  Discover the Collection
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ExclusiveBanner;
