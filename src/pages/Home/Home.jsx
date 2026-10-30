import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-[650px] overflow-hidden bg-[#F8F5F0] lg:min-h-[760px]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=2000&q=90"
          alt="LUMIÈRE women's fashion editorial"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[650px] max-w-[1440px] items-center px-6 py-20 sm:px-10 lg:min-h-[760px] lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 text-[10px] font-medium uppercase sm:text-xs"
          >
            Discover Your Signature Style
          </motion.p>

          <h1 className="font-serif text-5xl leading-[1.15] sm:text-6xl md:text-7xl lg:text-[88px]">
            Elegance
            <br />
            In Every
            <br />
            <span className="italic text-[#DCC0A5]">
              Moment.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-sm leading-7 text-white/80 sm:text-base">
            Discover a world of timeless silhouettes, refined
            details and effortless femininity. Style that speaks
            without saying a word.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">

            <Link
              to="/shop"
              className="group inline-flex items-center gap-4 bg-white px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#171717] transition-all duration-300 hover:bg-[#C8A98B]"
            >
              Shop Collection

              <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              to="/category/new-arrivals"
              className="group inline-flex items-center gap-3 border-b border-white/70 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:border-[#C8A98B] hover:text-[#C8A98B]"
            >
              Explore More

              <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

          </div>

        </motion.div>

      </div>

      {/* Bottom Label */}
      <div className="absolute bottom-7 right-7 z-10 hidden text-right text-white/80 sm:block">
        <p className="text-[9px] uppercase tracking-[0.3em]">
          LUMIÈRE COLLECTION
        </p>
        <p className="mt-1 font-serif text-lg italic">
          Season 2026
        </p>
      </div>

      {/* Decorative Side Text */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 text-[9px] uppercase tracking-[0.35em] text-white/70 xl:block">
        Timeless Fashion · Modern Identity
      </div>

    </section>
  );
};

export default Hero;