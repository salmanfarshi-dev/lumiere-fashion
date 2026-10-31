import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-[#171717] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-3xl tracking-[0.15em]">
              Shifa-fashion
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-neutral-400">
              Discover timeless fashion and effortless elegance. Make every
              moment a beautiful statement with .
            </p>

            <div className="mt-7 flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition hover:text-[#C8A98B]"
              >
                <FiInstagram size={19} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="transition hover:text-[#C8A98B]"
              >
                <FiFacebook size={19} />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="transition hover:text-[#C8A98B]"
              >
                <FiTwitter size={19} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-neutral-400">
              <li>
                <Link to="/" className="transition hover:text-[#C8A98B]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition hover:text-[#C8A98B]">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?sort=newest"
                  className="transition hover:text-[#C8A98B]"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-[#C8A98B]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-[#C8A98B]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]">
              Customer Care
            </h3>

            <ul className="space-y-4 text-sm text-neutral-400">
              <li>
                <Link to="/account" className="transition hover:text-[#C8A98B]">
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="transition hover:text-[#C8A98B]"
                >
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition hover:text-[#C8A98B]">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="transition hover:text-[#C8A98B]">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-[#C8A98B]">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]">
              Get In Touch
            </h3>

            <ul className="space-y-5 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0 text-[#C8A98B]" />
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <FiMail className="shrink-0 text-[#C8A98B]" />
                <a
                  href="mailto:hello@lumiere.com"
                  className="transition hover:text-[#C8A98B]"
                >
                  hello@lumiere.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-[#C8A98B]" />
                <a
                  href="tel:+8801000000000"
                  className="transition hover:text-[#C8A98B]"
                >
                  +880 1000-000000
                </a>
              </li>
            </ul>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 border-b border-[#C8A98B] pb-2 text-xs uppercase tracking-widest text-[#C8A98B] transition hover:text-white"
            >
              Contact Us <FiArrowUpRight />
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-7">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-neutral-500 md:flex-row md:text-left">
            <p>© {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>

            <p>Designed with elegance. Made for your style.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
