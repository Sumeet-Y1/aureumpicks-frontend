import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

const collections = [
  {
    label: "Watches",
    name: "The Timepiece Edit",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Fragrances",
    name: "Olfactory Luxe",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Leather Goods",
    name: "The Leather Chapter",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
  },
];

function FeaturedCollections() {
  return (
    <section className="section-space border-b border-border bg-black">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Curated Collections"
          title="Editorial edits crafted to feel private, precise, and rare."
          description="Three immersive capsules that define the house mood this season."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group border border-border bg-darkgray"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4 p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{collection.label}</p>
                <h3 className="font-serif text-3xl tracking-wide text-white">{collection.name}</h3>
                <a href="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white transition hover:text-gold">
                  Explore <ArrowRight size={13} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollections;
