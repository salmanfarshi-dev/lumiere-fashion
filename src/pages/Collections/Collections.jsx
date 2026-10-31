import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Container from "../../components/common/Container";

const collections = [
  {
    title: "Elegant Dresses",
    subtitle: "EFFORTLESS FEMININITY",
    description: "Discover beautiful dresses for every special moment.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Modern Tops",
    subtitle: "EVERYDAY ELEGANCE",
    description: "Refresh your wardrobe with timeless everyday styles.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Chic Accessories",
    subtitle: "THE FINISHING TOUCH",
    description: "Complete your look with beautiful finishing details.",
    image:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "New Arrivals",
    subtitle: "FRESH FROM Shifa-fashion",
    description: "Explore our latest styles and seasonal favorites.",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
  },
];

function Collections() {
  return (
    <main className="bg-[#F8F5F0] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90"
          alt="Shifa-fashion fashion collections"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div className="text-white max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase mb-5">
              Curated Just For You
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-6">
              Our Collections
            </h1>

            <p className="text-sm md:text-base leading-7 text-white/85">
              Explore timeless pieces, modern trends, and styles that celebrate
              your individuality.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Introduction */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
              Find Your Signature Style
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#171717]">
              Curated With Love
            </h2>

            <p className="text-sm text-gray-500 leading-7 mt-5">
              From everyday essentials to statement pieces, discover collections
              designed to make every moment feel special.
            </p>
          </div>
        </Container>
      </section>

      {/* Collection Grid */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-9">
            {collections.map((collection, index) => (
              <article
                key={collection.title}
                className="group relative overflow-hidden bg-white"
              >
                <div className="relative h-[380px] md:h-[500px] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9 text-white">
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-3 text-white/80">
                      {collection.subtitle}
                    </p>

                    <h3 className="font-serif text-3xl md:text-4xl mb-3">
                      {collection.title}
                    </h3>

                    <p className="text-sm text-white/80 leading-6 mb-6 max-w-sm">
                      {collection.description}
                    </p>

                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-3 border-b border-white pb-2 text-xs tracking-widest uppercase hover:text-[#E7C7A8] hover:border-[#E7C7A8] transition"
                    >
                      Explore Collection <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom Banner */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
              Your Style Journey Starts Here
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#171717]">
              Find Something Beautiful.
            </h2>

            <p className="text-sm text-gray-500 leading-7 mt-5 mb-8">
              Discover your favorite pieces and create a wardrobe that feels
              completely yours.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#171717] text-white! px-9 py-4 text-xs tracking-widest uppercase hover:bg-[#C8A98B] transition hover:text-black!"
            >
              Shop All Products <FiArrowRight />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Collections;
