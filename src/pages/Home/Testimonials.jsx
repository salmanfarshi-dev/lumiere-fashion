import { motion } from "framer-motion";
import { FiStar, FiMessageSquare } from "react-icons/fi";

const reviews = [
  {
    name: "Sophia Williams",
    location: "New York, USA",
    review:
      "Absolutely loved the quality and design! The outfit looks even more beautiful in person. Definitely shopping again.",
  },
  {
    name: "Olivia Martin",
    location: "London, UK",
    review:
      "Shifa-fashion has become my favorite fashion store. The packaging, quality and overall experience were amazing.",
  },
  {
    name: "Emma Anderson",
    location: "Toronto, Canada",
    review:
      "Beautiful collection with timeless designs. The fabric feels premium and the fit is just perfect!",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#F8F5F0] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#b18b6b]">
            Love From Our Customers
          </p>

          <h2 className="font-serif text-3xl text-[#171717] md:text-5xl">
            What They Say
          </h2>

          <p className="mt-4 text-sm text-gray-500">
            Real style inspiration from our fashion community.
          </p>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 shadow-sm transition-shadow hover:shadow-lg md:p-9"
            >
              <FiMessageSquare className="mb-6 text-3xl text-[#C8A98B]" />

              {/* Stars */}
              <div className="mb-5 flex gap-1 text-[#C8A98B]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar key={star} fill="currentColor" size={15} />
                ))}
              </div>

              {/* Review */}
              <p className="mb-8 text-sm leading-7 text-gray-600">
                "{item.review}"
              </p>

              {/* Customer */}
              <div className="border-t border-gray-100 pt-5">
                <h3 className="font-medium text-[#171717]">{item.name}</h3>

                <p className="mt-1 text-xs text-gray-400">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
