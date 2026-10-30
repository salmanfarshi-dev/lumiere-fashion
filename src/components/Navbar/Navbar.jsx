
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "New Arrivals", path: "/category/new-arrivals" },
    { name: "Collections", path: "/category/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkClass = ({ isActive }) =>
    `text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
      isActive
        ? "text-[#C8A98B]"
        : "text-[#333] hover:text-[#C8A98B]"
    }`;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#171717] px-4 py-2 text-center text-[9px] tracking-[0.2em] text-white sm:text-[10px]">
        COMPLIMENTARY SHIPPING ON ORDERS OVER $100
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-md">

        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-xl lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Brand Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif tracking-[0.18em] text-[#171717] sm:text-3xl"
          >
            LUMIÈRE
          </Link>

          {/* Navbar Actions */}
          <div className="ml-auto flex items-center gap-4 sm:gap-6">

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-lg transition hover:text-[#C8A98B]"
              aria-label="Search"
            >
              <FiSearch />
            </button>

            <Link
              to="/wishlist"
              className="hidden text-lg transition hover:text-[#C8A98B] sm:block"
              aria-label="Wishlist"
            >
              <FiHeart />
            </Link>

            <Link
              to="/account"
              className="hidden text-lg transition hover:text-[#C8A98B] sm:block"
              aria-label="My account"
            >
              <FiUser />
            </Link>

            <Link
              to="/cart"
              className="relative text-lg transition hover:text-[#C8A98B]"
              aria-label="Shopping cart"
            >
              <FiShoppingBag />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8A98B] text-[9px] text-white">
                0
              </span>
            </Link>

          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-neutral-100"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const query = e.currentTarget.elements.search.value;
                  window.location.href = `/shop?search=${encodeURIComponent(query)}`;
                }}
                className="mx-auto flex max-w-2xl items-center gap-3 px-5 py-5"
              >
                <FiSearch className="text-neutral-400" />

                <input
                  name="search"
                  type="search"
                  placeholder="Search your favourite styles..."
                  className="w-full bg-transparent text-sm outline-none"
                  autoFocus
                />

                <button type="submit" className="text-xs uppercase tracking-widest">
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-white p-7"
            >

              <div className="mb-12 flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl tracking-[0.15em]"
                >
                  LUMIÈRE
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-xl"
                >
                  <FiX />
                </button>
              </div>

              <nav className="flex flex-col gap-7">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border-b border-neutral-100 pb-4 text-xs uppercase tracking-[0.2em]"
                    >
                      {link.name}
                      <FiChevronDown className="rotate-[-90deg] text-neutral-400" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex gap-6 border-t border-neutral-100 pt-6">
                <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                  <FiHeart className="text-xl" />
                </Link>

                <Link to="/account" onClick={() => setMenuOpen(false)}>
                  <FiUser className="text-xl" />
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
