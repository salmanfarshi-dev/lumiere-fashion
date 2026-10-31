
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import Container from "../../components/common/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";
import { getStorage, setStorage } from "../../utils/localStorage";

function Wishlist() {
  const [wishlist, setWishlist] = useState(() =>
    getStorage("lumiere_wishlist", [])
  );

  useEffect(() => {
    const syncWishlist = () => {
      setWishlist(getStorage("lumiere_wishlist", []));
    };

    window.addEventListener("lumiere-storage", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("lumiere-storage", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, []);

  const wishlistIds = wishlist.map((item) =>
    typeof item === "object" ? item.id : item
  );

  const wishlistProducts = products.filter((product) =>
    wishlistIds.some((id) => String(id) === String(product.id))
  );

  const removeAllWishlist = () => {
    setStorage("lumiere_wishlist", []);
    setWishlist([]);
    window.dispatchEvent(new Event("lumiere-storage"));
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0] py-12 md:py-16">
      <Container>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FiHeart className="text-3xl text-[#C8A98B]" />
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A98B] mb-3">
            Your Favorites
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#171717]">
            My Wishlist
          </h1>

          <p className="text-sm text-gray-500 mt-4">
            Your favorite pieces, all in one place.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
              <p className="text-sm text-gray-600">
                {wishlistProducts.length}{" "}
                {wishlistProducts.length === 1 ? "Item" : "Items"} Saved
              </p>

              <button
                onClick={removeAllWishlist}
                className="text-xs uppercase tracking-wider text-gray-500 hover:text-red-500 transition"
              >
                Clear Wishlist
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-lg mx-auto text-center bg-white px-6 py-14 md:py-20">
            <div className="w-20 h-20 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-6">
              <FiHeart className="text-3xl text-[#C8A98B]" />
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-[#171717] mb-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-sm text-gray-500 leading-7 mb-8">
              You haven't saved any products yet. Explore our collection and
              save your favorite styles here.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#171717] text-white! px-7 py-3.5 text-sm hover:bg-[#C8A98B] transition"
            >
              <FiShoppingBag /> Explore Collection <FiArrowRight />
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}

export default Wishlist;
