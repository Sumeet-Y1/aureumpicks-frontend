import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${alignment}`}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      ) : null}
      <h2 className="section-heading">{title}</h2>
      {description ? <p className="section-copy mt-5">{description}</p> : null}
    </motion.div>
  );
}

export default SectionHeading;
