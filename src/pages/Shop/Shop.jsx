
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiSliders, FiX } from "react-icons/fi";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";

function Shop() {
  const [searchParams] = useSearchParams();

  // Filter States
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sort, setSort] = useState(
    searchParams.get("sort") || "featured"
  );

  const [showFilters, setShowFilters] = useState(false);

  // Available Categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Available Sizes
  const availableSizes = [
    ...new Set(products.flatMap((product) => product.sizes || [])),
  ];

  // Available Colors
  const availableColors = [
    ...new Set(products.flatMap((product) => product.colors || [])),
  ];

  // Maximum Product Price
  const maxProductPrice = Math.max(
    ...products.map((product) => Number(product.price))
  );

  const [maxPrice, setMaxPrice] = useState(maxProductPrice);

  // Filter Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Filter
    if (search.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    // Category Filter
    if (category.toLowerCase() !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Price Filter
    result = result.filter(
      (product) => Number(product.price) <= maxPrice
    );

    // Size Filter
    if (selectedSize) {
      result = result.filter((product) =>
        product.sizes?.includes(selectedSize)
      );
    }

    // Color Filter
    if (selectedColor) {
      result = result.filter((product) =>
        product.colors?.includes(selectedColor)
      );
    }

    // Sorting
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "newest":
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;

      case "popular":
        result.sort((a, b) => b.popularity - a.popularity);
        break;

      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [
    search,
    category,
    sort,
    maxPrice,
    selectedSize,
    selectedColor,
  ]);

  // Clear All Filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
    setMaxPrice(maxProductPrice);
    setSelectedSize("");
    setSelectedColor("");
  };

  return (
    <main className="min-h-screen bg-white">

      {/* Page Header */}
      <section className="bg-[#F8F5F0] px-5 py-16 text-center md:py-20">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C8A98B]">
          Discover Your Style
        </p>

        <h1 className="font-serif text-4xl text-[#171717] md:text-6xl">
          Our Collection
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-neutral-500">
          Explore timeless pieces and discover something beautiful for every
          moment.
        </p>
      </section>

      {/* Shop Content */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">

        {/* Search and Sort */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-neutral-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#C8A98B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 border border-neutral-200 px-4 py-3 text-xs uppercase tracking-wider md:hidden"
            >
              <FiSliders /> Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-neutral-200 bg-white px-4 py-3 text-xs outline-none focus:border-[#C8A98B]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">

          {/* Filters Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
            <div className="sticky top-24">

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-widest">
                  Filters
                </h2>

                <button
                  onClick={clearFilters}
                  className="text-xs text-[#B18B6B] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="border-b border-neutral-200 pb-7">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
                  Categories
                </h3>

                <div className="space-y-3">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setShowFilters(false);
                      }}
                      className={`block w-full text-left text-sm transition ${
                        category.toLowerCase() === item.toLowerCase()
                          ? "font-semibold text-[#B18B6B]"
                          : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="border-b border-neutral-200 py-7">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
                  Maximum Price
                </h3>

                <input
                  type="range"
                  min="0"
                  max={maxProductPrice}
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C8A98B]"
                />

                <div className="mt-3 flex justify-between text-xs text-neutral-500">
                  <span>৳0</span>

                  <span className="font-semibold text-[#171717]">
                    ৳{maxPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Size Filter */}
              <div className="border-b border-neutral-200 py-7">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
                  Select Size
                </h3>

                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize(
                          selectedSize === size ? "" : size
                        )
                      }
                      className={`border px-3 py-2 text-xs transition ${
                        selectedSize === size
                          ? "border-[#171717] bg-[#171717] text-white"
                          : "border-neutral-200 hover:border-[#C8A98B]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="border-b border-neutral-200 py-7">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider">
                  Select Color
                </h3>

                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        setSelectedColor(
                          selectedColor === color ? "" : color
                        )
                      }
                      className={`border px-3 py-2 text-xs transition ${
                        selectedColor === color
                          ? "border-[#171717] bg-[#171717] text-white"
                          : "border-neutral-200 hover:border-[#C8A98B]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Products */}
          <div>

            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Showing{" "}
                <span className="font-semibold text-[#171717]">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              {(category !== "All" ||
                search ||
                maxPrice !== maxProductPrice ||
                selectedSize ||
                selectedColor) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black"
                >
                  <FiX /> Clear filters
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

                <FiSearch className="mb-5 text-4xl text-neutral-300" />

                <h3 className="font-serif text-2xl text-[#171717]">
                  No Products Found
                </h3>

                <p className="mt-3 text-sm text-neutral-500">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 bg-[#171717] px-6 py-3 text-xs uppercase tracking-widest text-white transition hover:bg-[#C8A98B]"
                >
                  Clear Filters
                </button>

              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;
