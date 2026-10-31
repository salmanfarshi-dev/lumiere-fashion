import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";

const galleryImages = [
  "photo-1483985988355-763728e1935b",
  "photo-1539109136881-3be0616acf4b",
  "photo-1485230895905-ec40ba36b9bc",
  "photo-1529139574466-a303027c1d8b",
  "photo-1490481651871-ab68de25d43d",
  "photo-1483985988355-763728e1935b",
];

function InstagramGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <FiInstagram className="mx-auto text-2xl text-[#C8A98B] mb-4" />

          <p className="text-xs uppercase tracking-[0.3em] text-[#C8A98B] mb-3">
            Follow Our Journey
          </p>

          <h2 className="font-serif text-3xl md:text-5xl text-[#171717]">
            Style With Shifa-fashion
          </h2>

          <p className="text-sm text-gray-500 mt-4">
            Get inspired by our latest fashion moments.
          </p>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 text-xs tracking-widest border-b border-[#C8A98B] pb-1 hover:text-[#C8A98B] transition"
          >
            @LUMIERE.FASHION
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-square overflow-hidden bg-[#F8F5F0]"
            >
              <img
                src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=500&q=85`}
                alt={`LUMIÈRE fashion inspiration ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
                <FiInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstagramGallery;
