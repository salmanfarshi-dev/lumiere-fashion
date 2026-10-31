
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getStorage, setStorage } from "../../utils/localStorage";

const imageUrl = (image) =>
  `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`;

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => String(item.id) === id);

  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || "");
      setSelectedSize("");
      setSelectedColor(product.colors?.[0] || "");
      setQuantity(1);

      const wishlist = getStorage("lumiere_wishlist", []);
      setIsWishlisted(
        wishlist.some((item) => item.id === product.id)
      );
    }
  }, [product]);

  if (!product) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-serif text-3xl text-[#171717]">
          Product Not Found
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Sorry, this product is not available.
        </p>

        <Link
          to="/shop"
          className="mt-6 bg-[#171717] px-7 py-3 text-xs uppercase tracking-widest text-white"
        >
          Back to Shop
        </Link>
      </main>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const updateCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.");
      return false;
    }

    if (!selectedColor) {
      toast.error("Please select a color first.");
      return false;
    }

    if (!product.inStock || product.stock <= 0) {
      toast.error("This product is out of stock.");
      return false;
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
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + quantity,
                product.stock
              ),
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          size: selectedSize,
          color: selectedColor,
          quantity,
        },
      ];
    }

    setStorage("lumiere_cart", updatedCart);
    window.dispatchEvent(new Event("lumiere-storage"));

    toast.success("Added to your bag!");
    return true;
  };

  const handleAddToCart = () => {
    updateCart();
  };

  const handleBuyNow = () => {
    const success = updateCart();

    if (success) {
      navigate("/cart");
    }
  };

  const toggleWishlist = () => {
    const wishlist = getStorage("lumiere_wishlist", []);

    const alreadyAdded = wishlist.some(
      (item) => item.id === product.id
    );

    const updatedWishlist = alreadyAdded
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setStorage("lumiere_wishlist", updatedWishlist);
    window.dispatchEvent(new Event("lumiere-storage"));

    setIsWishlisted(!alreadyAdded);

    toast.success(
      alreadyAdded
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  const stockAvailable = Math.max(0, Number(product.stock) || 0);

  return (
    <main className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <section className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-500 transition hover:text-[#C8A98B]"
        >
          <FiArrowLeft />
          Back to Shop
        </Link>
      </section>

      {/* Product Details */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">

        {/* Product Images */}
        <div>
          <div className="overflow-hidden bg-[#F8F5F0]">
            <img
              src={imageUrl(selectedImage)}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {/* Image Gallery */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images?.map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden border-2 transition ${
                  selectedImage === image
                    ? "border-[#C8A98B]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={imageUrl(image)}
                  alt={`${product.name} view ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="lg:sticky lg:top-28 lg:h-fit">

          <p className="text-xs uppercase tracking-[0.25em] text-[#C8A98B]">
            {product.category}
          </p>

          <h1 className="mt-4 font-serif text-3xl leading-tight text-[#171717] sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-[#C8A98B]">
              <FiStar className="fill-current" />
              <span className="text-sm font-semibold text-[#171717]">
                {product.rating}
              </span>
            </div>

            <span className="text-sm text-neutral-400">
              ({product.reviews} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-[#171717]">
              ৳{Number(product.price).toLocaleString()}
            </span>

            {product.originalPrice > product.price && (
              <>
                <span className="text-base text-neutral-400 line-through">
                  ৳{Number(product.originalPrice).toLocaleString()}
                </span>

                <span className="bg-[#F5E8E8] px-3 py-1 text-xs font-semibold text-[#A65D5D]">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-7 border-t border-neutral-200 pt-6 text-sm leading-8 text-neutral-500">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mt-5 flex items-center gap-2 text-sm">
            {product.inStock && stockAvailable > 0 ? (
              <>
                <FiCheck className="text-green-600" />
                <span className="text-green-700">
                  In Stock ({stockAvailable} available)
                </span>
              </>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-widest">
                Select Size
              </h3>

              <span className="text-xs text-neutral-400">
                {selectedSize
                  ? `Selected: ${selectedSize}`
                  : "Choose your size"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 border px-4 py-3 text-xs transition ${
                    selectedSize === size
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-[#C8A98B]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">
              Select Color
              {selectedColor && (
                <span className="ml-2 font-normal normal-case text-neutral-500">
                  — {selectedColor}
                </span>
              )}
            </h3>

            <div className="flex flex-wrap gap-2">
              {product.colors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-4 py-2 text-xs transition ${
                    selectedColor === color
                      ? "border-[#171717] bg-[#171717] text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-[#C8A98B]"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest">
              Quantity
            </h3>

            <div className="inline-flex items-center border border-neutral-200">
              <button
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity <= 1}
                className="p-3 text-neutral-600 transition hover:text-black disabled:opacity-30"
              >
                <FiMinus />
              </button>

              <span className="min-w-12 text-center text-sm">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(stockAvailable, current + 1)
                  )
                }
                disabled={quantity >= stockAvailable}
                className="p-3 text-neutral-600 transition hover:text-black disabled:opacity-30"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || stockAvailable <= 0}
              className="flex flex-1 items-center justify-center gap-3 bg-[#171717] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#C8A98B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiShoppingBag />
              Add to Bag
            </button>

            <button
              onClick={toggleWishlist}
              className={`flex items-center justify-center border px-5 py-4 transition ${
                isWishlisted
                  ? "border-red-300 bg-red-50 text-red-500"
                  : "border-neutral-200 text-[#171717] hover:border-[#C8A98B]"
              }`}
              aria-label="Toggle wishlist"
            >
              <FiHeart
                className={isWishlisted ? "fill-current" : ""}
                size={19}
              />
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            disabled={!product.inStock || stockAvailable <= 0}
            className="mt-3 w-full border border-[#171717] px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[#171717] transition hover:bg-[#F8F5F0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buy Now
          </button>

          {/* Extra Information */}
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="text-xs leading-7 text-neutral-500">
              Complimentary packaging on every order.
              <br />
              Easy returns within our return policy.
              <br />
              Secure checkout for a smooth shopping experience.
            </p>
          </div>

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C8A98B]">
              You May Also Like
            </p>

            <h2 className="font-serif text-3xl text-[#171717] md:text-4xl">
              Related Products
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}

export default ProductDetails;
