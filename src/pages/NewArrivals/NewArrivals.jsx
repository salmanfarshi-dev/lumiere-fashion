import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import Container from "../../components/common/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import { newArrivals } from "../../data/products";

function NewArrivals() {
  return (
    <main className="bg-[#F8F5F0] min-h-screen">
      {/* Hero */}
      <section className="relative h-[380px] md:h-[480px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=90"
          alt="New fashion arrivals"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div className="text-white">
            <p className="text-xs tracking-[0.35em] uppercase mb-5">
              Just Arrived
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-5">
              New Arrivals
            </h1>

            <p className="text-sm md:text-base text-white/85 max-w-lg mx-auto leading-7">
              Discover the latest styles, fresh designs and timeless pieces
              curated for your wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
              Fresh From Shifa-fashion
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#171717]">
              The Latest Edit
            </h2>

            <p className="text-sm text-gray-500 leading-7 mt-5">
              Explore our newest arrivals and find your next favorite outfit.
              Beautiful styles, thoughtfully selected for you.
            </p>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl text-[#171717]">
                Latest Products
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {newArrivals.length} products to discover
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border-b border-[#171717] pb-2 w-fit hover:text-[#B18A68] hover:border-[#B18A68] transition"
            >
              View All Products <FiArrowRight />
            </Link>
          </div>

          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white text-center py-20 px-5">
              <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />

              <h3 className="font-serif text-2xl text-[#171717]">
                Coming Soon
              </h3>

              <p className="text-sm text-gray-500 mt-3">
                Our new collection is on its way.
              </p>

              <Link
                to="/shop"
                className="inline-block mt-6 bg-[#171717] text-white px-7 py-3 text-xs tracking-widest uppercase"
              >
                Explore Shop
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* Bottom Banner */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
              Made For Your Moments
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#171717]">
              A Fresh Look Awaits.
            </h2>

            <p className="text-sm text-gray-500 leading-7 mt-5 mb-8">
              Find pieces that express your personality and make everyday
              dressing feel special.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#171717] text-white! px-9 py-4 text-xs tracking-widest uppercase hover:bg-[#C8A98B] transition"
            >
              Explore All <FiArrowRight />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default NewArrivals;
