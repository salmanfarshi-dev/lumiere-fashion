import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiStar,
  FiAward,
  FiFeather,
} from "react-icons/fi";
import Container from "../../components/common/Container";

function About() {
  return (
    <main className="bg-[#F8F5F0]">
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[560px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90"
          alt="Shifa-fashion fashion collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div className="max-w-2xl text-white">
            <p className="text-xs tracking-[0.35em] uppercase mb-5">
              The Story Behind Shifa-fashion
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-6">About Us</h1>

            <p className="text-sm md:text-base leading-7 text-white/85">
              Fashion is more than what you wear. It's how you express who you
              are.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85"
                alt="Fashion styling"
                className="w-full h-64 md:h-96 object-cover mt-10"
              />

              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85"
                alt="Women's fashion"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
                Our Story
              </p>

              <h2 className="font-serif text-4xl md:text-5xl text-[#171717] leading-tight mb-7">
                A Love for Fashion, A Passion for Elegance.
              </h2>

              <p className="text-sm text-gray-600 leading-8 mb-5">
                Shifa-fashion was created with a simple idea: every woman
                deserves to feel confident, comfortable, and beautiful in what
                she wears.
              </p>

              <p className="text-sm text-gray-600 leading-8 mb-8">
                We believe great style doesn't need to be complicated. That's
                why we bring together timeless designs, beautiful details, and
                modern fashion to help you create a wardrobe that feels uniquely
                yours.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-[#171717] text-white! px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#C8A98B] hover:text-black! transition"
              >
                Explore Collection <FiArrowRight />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white py-16 md:py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
              What We Believe
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#171717]">
              Our Mission & Vision
            </h2>

            <p className="text-sm text-gray-500 leading-7 mt-5">
              Our purpose is to make everyday fashion feel special through
              thoughtful style and meaningful experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8F5F0] p-8 md:p-12 text-center">
              <FiHeart className="text-3xl text-[#C8A98B] mx-auto mb-6" />

              <h3 className="font-serif text-3xl mb-5">Our Mission</h3>

              <p className="text-sm text-gray-600 leading-8">
                To bring women thoughtfully selected fashion that celebrates
                individuality, comfort, confidence, and personal expression.
              </p>
            </div>

            <div className="bg-[#F8F5F0] p-8 md:p-12 text-center">
              <FiStar className="text-3xl text-[#C8A98B] mx-auto mb-6" />

              <h3 className="font-serif text-3xl mb-5">Our Vision</h3>

              <p className="text-sm text-gray-600 leading-8">
                To become a fashion destination where timeless elegance meets
                modern trends, creating a beautiful shopping experience for
                every customer.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Fashion Philosophy */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
              The Shifa-fashion Difference
            </p>

            <h2 className="font-serif text-4xl md:text-5xl text-[#171717]">
              Our Fashion Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="text-center">
              <FiFeather className="text-3xl text-[#C8A98B] mx-auto mb-5" />

              <h3 className="font-serif text-2xl mb-3">Timeless Style</h3>

              <p className="text-sm text-gray-500 leading-7">
                We appreciate elegant designs that remain beautiful beyond
                seasonal trends.
              </p>
            </div>

            <div className="text-center">
              <FiHeart className="text-3xl text-[#C8A98B] mx-auto mb-5" />

              <h3 className="font-serif text-2xl mb-3">Made with Care</h3>

              <p className="text-sm text-gray-500 leading-7">
                Every collection is selected with attention to style, comfort,
                and detail.
              </p>
            </div>

            <div className="text-center">
              <FiAward className="text-3xl text-[#C8A98B] mx-auto mb-5" />

              <h3 className="font-serif text-2xl mb-3">Customer First</h3>

              <p className="text-sm text-gray-500 leading-7">
                Your satisfaction and shopping experience are at the heart of
                everything we do.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=90"
          alt="Elegant fashion collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-5">
              Discover Your Style
            </p>

            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8">
              Elegance in Every Detail.
            </h2>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-white text-[#171717] px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#C8A98B] hover:text-white transition"
            >
              Shop Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
