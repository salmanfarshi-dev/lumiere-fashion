import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiEye, FiX, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";
import { getStorage, setStorage } from "../../utils/localStorage";

const ProductCard = ({ product }) => {
  const [quickView, setQuickView] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const [wishlisted, setWishlisted] = useState(() =>
    getStorage("lumiere_wishlist", []).some(
      (item) => item.id === product.id
    )
  );

 const imageUrl = (image) =>
  `https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=85`;

  const toggleWishlist = () => {
    const wishlist = getStorage("lumiere_wishlist", []);
    const exists = wishlist.some((item) => item.id === product.id);

    const updated = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setStorage("lumiere_wishlist", updated);
    setWishlisted(!exists);

    toast.success(
      exists ? "Removed from wishlist" : "Added to wishlist"
    );

    window.dispatchEvent(new Event("lumiere-storage"));
  };

  const addToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first");
      return;
    }

    const cart = getStorage("lumiere_cart", []);

    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = cart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          size: selectedSize,
          color: selectedColor,
          quantity: 1,
        },
      ];
    }

    setStorage("lumiere_cart", updatedCart);

    toast.success("Added to your shopping bag!");
    setQuickView(false);
    setSelectedSize("");

    window.dispatchEvent(new Event("lumiere-storage"));
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="group min-w-0"
      >
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F5F0]">

          <Link to={`/product/${product.id}`}>
            <img
              src={imageUrl(product.images[0])}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badge */}
          {product.discount > 0 && (
            <span className="absolute left-3 top-3 bg-white px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#171717]">
              -{product.discount}%
            </span>
          )}

          {product.isNew && (
            <span className="absolute bottom-3 left-3 bg-[#C8A98B] px-3 py-1.5 text-[9px] uppercase tracking-wider text-white">
              New
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={toggleWishlist}
            aria-label="Toggle wishlist"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg transition hover:bg-[#171717] hover:text-white"
          >
            <FiHeart
              className={wishlisted ? "fill-[#C8A98B] text-[#C8A98B]" : ""}
            />
          </button>

          {/* Quick View */}
          <button
            onClick={() => setQuickView(true)}
            className="absolute bottom-0 left-0 flex w-full translate-y-full items-center justify-center gap-2 bg-white/95 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#171717] transition-transform duration-300 group-hover:translate-y-0"
          >
            <FiEye />
            Quick View
          </button>
        </div>

        {/* Product Information */}
        <div className="pt-4">

          <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-neutral-400">
            {product.category}
          </p>

          <Link to={`/product/${product.id}`}>
            <h3 className="line-clamp-1 text-sm font-medium text-[#333] transition hover:text-[#C8A98B]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center justify-between gap-2">

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[#171717]">
                ৳{product.price.toLocaleString("en-BD")}
              </span>

              <span className="text-xs text-neutral-400 line-through">
                ৳{product.originalPrice.toLocaleString("en-BD")}
              </span>
            </div>

            <span className="shrink-0 text-[10px] text-[#C8A98B]">
              ★ {product.rating}
            </span>

          </div>
        </div>
      </motion.article>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-3xl overflow-hidden bg-white md:grid-cols-2"
            >
              <button
                onClick={() => setQuickView(false)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow"
                aria-label="Close quick view"
              >
                <FiX />
              </button>

              <img
                src={imageUrl(product.images[0])}
                alt={product.name}
                className="h-full max-h-[450px] w-full object-cover"
              />

              <div className="flex flex-col justify-center p-6 sm:p-9">

                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C8A98B]">
                  {product.category}
                </p>

                <h2 className="mt-3 font-serif text-2xl text-[#171717]">
                  {product.name}
                </h2>

                <p className="mt-3 text-sm text-neutral-500">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="font-semibold">
                    ৳{product.price.toLocaleString("en-BD")}
                  </span>
                  <span className="text-sm text-neutral-400 line-through">
                    ৳{product.originalPrice.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest">
                    Select Size
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 min-w-10 border px-3 text-xs transition ${
                          selectedSize === size
                            ? "border-[#171717] bg-[#171717] text-white"
                            : "border-neutral-200 hover:border-[#171717]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest">
                    Select Color
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`border px-3 py-2 text-xs ${
                          selectedColor === color
                            ? "border-[#171717] bg-[#171717] text-white"
                            : "border-neutral-200"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="mt-7 flex w-full items-center justify-center gap-3 bg-[#171717] py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#C8A98B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiShoppingBag />
                  {product.inStock ? "Add To Bag" : "Out Of Stock"}
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;