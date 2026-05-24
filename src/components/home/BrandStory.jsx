import { Award, Gem, HandHelping } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: HandHelping, label: "Hand-Curated" },
  { icon: Award, label: "Authenticity Guaranteed" },
  { icon: Gem, label: "White Glove Delivery" },
];

function BrandStory() {
  return (
    <section id="about" className="section-space bg-black">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="gold-divider mx-auto" />
          <h2 className="mt-8 font-serif text-4xl italic tracking-wide text-white sm:text-5xl">
            Born from an obsession with the exceptional
          </h2>
          <div className="mt-8 space-y-6 text-base font-light leading-8 text-muted">
            <p>
              AureumPicks exists for clients who do not want everything. They want the right thing, chosen with intent.
            </p>
            <p>
              We bring together watches, fragrance, fashion, jewelry, and leather pieces that reward patience, material sensitivity, and discernment.
            </p>
            <p>
              The result is a luxury storefront that feels quieter, slower, and more editorial than conventional ecommerce.
            </p>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="panel flex flex-col items-center gap-5 px-6 py-10 text-center"
              >
                <Icon size={24} className="text-gold" />
                <p className="font-serif text-2xl tracking-wide text-white">{feature.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
