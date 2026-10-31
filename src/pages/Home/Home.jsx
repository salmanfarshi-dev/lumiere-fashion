import Hero from "./Hero";
import ProductSection from "./ProductSection";
import Testimonials from "./Testimonials";
import { newArrivals, bestSellers } from "../../data/products";
import FeaturedCategories from "./FeaturedCategories";
import InstagramGallery from "./InstagramGallery";
import Newsletter from "./Newsletter";
const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <Testimonials />
      <ProductSection
        subtitle="Just Arrived"
        title="New Arrivals"
        description="Discover our latest collection, thoughtfully selected to bring effortless elegance to your wardrobe."
        products={newArrivals}
      />

      {/* Editorial Banner */}
      <section className="bg-[#F8F5F0] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=85"
              alt="LUMIÈRE fashion collection"
              loading="lazy"
              className="h-[350px] w-full object-cover sm:h-[500px]"
            />
          </div>

          <div className="max-w-lg lg:pl-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#C8A98B]">
              The Art of Dressing
            </p>

            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#171717] sm:text-6xl">
              Style That
              <br />
              Tells Your
              <br />
              <span className="italic">Story.</span>
            </h2>

            <p className="mt-6 text-sm leading-8 text-neutral-500">
              Fashion is more than what you wear. It is how you express
              yourself, how you feel, and how you move through the world. Find
              pieces that feel like you.
            </p>

            <a
              href="/shop"
              className="mt-8 inline-flex border-b border-[#171717] pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-[#C8A98B] hover:text-[#C8A98B]"
            >
              Discover The Collection
            </a>
          </div>
        </div>
      </section>

      <ProductSection
        subtitle="Loved By You"
        title="Best Sellers"
        description="Explore the pieces our customers can't stop wearing."
        products={bestSellers}
      />
      <InstagramGallery />
      <Newsletter />
    </>
  );
};

export default Home;
