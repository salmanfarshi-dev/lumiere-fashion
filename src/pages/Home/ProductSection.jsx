import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

import Container from "../../components/common/Container";
import SectionTitle from "../../components/common/SectionTitle";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductSection = ({
  title,
  subtitle,
  description,
  products,
  link = "/shop",
}) => {
  return (
    <section className="py-20 sm:py-24">

      <Container>

        <SectionTitle
          subtitle={subtitle}
          title={title}
          description={description}
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7">

          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={link}
            className="group flex items-center gap-4 border-b border-[#171717] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-[#C8A98B] hover:text-[#C8A98B]"
          >
            View All Products
            <FiArrowRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

      </Container>

    </section>
  );
};

export default ProductSection;