import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

const titleLines = ["Curated For", "Those Who", "Demand More"];

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,theme(colors.black),theme(colors.charcoal),theme(colors.black))]" />
      <div className="absolute inset-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80"
          alt="Aureum editorial"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container-shell relative z-10 flex min-h-screen flex-col justify-center py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.32em] text-gold"
        >
          The New Standard of Luxury
        </motion.p>

        <div className="mt-8 space-y-2">
          {titleLines.map((line, index) => (
            <motion.h1
              key={line}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 * index }}
              className="font-serif text-6xl font-normal tracking-wide text-white sm:text-7xl lg:text-8xl"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 max-w-2xl text-base font-light leading-8 text-muted"
        >
          A cinematic destination for rare timepieces, modern tailoring, scent, and objects of lasting presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button as="a" href="/shop" variant="primary">
            Explore Collection <ArrowRight size={14} />
          </Button>
          <Button as="a" href="#about" variant="secondary">
            Our Story
          </Button>
        </motion.div>

        <div className="mt-20 border-t border-gold/20 pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-8">
              {["2,400+ Clients", "150+ Brands", "Est. 2020"].map((item) => (
                <p key={item} className="text-xs uppercase tracking-[0.28em] text-white">
                  {item}
                </p>
              ))}
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted"
            >
              <span className="inline-flex h-2 w-2 bg-gold" />
              Scroll
              <ArrowDown size={12} className="text-gold" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
