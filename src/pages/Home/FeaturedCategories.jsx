
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Dresses",
    subtitle: "Elegance for every occasion",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=85",
    link: "/shop?category=dresses",
  },
  {
    name: "Tops",
    subtitle: "Everyday effortless style",
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=800&q=85",
    link: "/shop?category=tops",
  },
  {
    name: "Accessories",
    subtitle: "Complete your look",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85",
    link: "/shop?category=accessories",
  },
];

function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#b18b6b] mb-3">
            Explore Our World
          </p>

          <h2 className="font-serif text-3xl md:text-5xl text-[#171717]">
            Shop by Category
          </h2>

          <p className="text-sm text-gray-500 mt-4">
            Find the perfect pieces for your personal style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link to={category.link} className="group block">
                <div className="relative h-[420px] md:h-[480px] overflow-hidden bg-[#f5f0eb]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <h3 className="font-serif text-3xl mb-2">
                      {category.name}
                    </h3>

                    <p className="text-sm text-white/90">
                      {category.subtitle}
                    </p>

                    <span className="inline-block mt-5 text-xs tracking-[0.2em] uppercase border-b border-white pb-1">
                      Explore Collection
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
