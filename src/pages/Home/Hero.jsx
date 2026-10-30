
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

function Hero() {
  return (
    <section className="relative min-h-[650px] md:min-h-[750px] flex items-center overflow-hidden bg-[#e9e1d9]">
      <img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=90"
        alt="Lumiere fashion collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-xl text-white"
        >
          <p className="text-xs md:text-sm tracking-[0.35em] uppercase mb-6">
            The New Season Collection
          </p>

          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
            Elegance in
            <br />
            Every Moment.
          </h1>

          <p className="text-sm md:text-base text-white/90 leading-7 max-w-md mb-9">
            Discover timeless fashion designed to make every moment
            effortlessly beautiful. Find your style with LUMIÈRE.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-black px-7 py-4 text-xs tracking-widest uppercase hover:bg-[#c8a98b] transition"
            >
              Shop Collection <FiArrowUpRight size={18} />
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 border border-white px-7 py-4 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition"
            >
              Explore More <FiArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
