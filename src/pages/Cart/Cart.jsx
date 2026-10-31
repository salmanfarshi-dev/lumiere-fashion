
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import { getStorage, setStorage } from "../../utils/localStorage";

const imageUrl = (image) =>
  `https://images.unsplash.com/${image}?auto=format&fit=crop&w=500&q=85`;

const Cart = () => {
  const [cart, setCart] = useState(() =>
    getStorage("lumiere_cart", [])
  );

  useEffect(() => {
    const syncCart = () => {
      setCart(getStorage("lumiere_cart", []));
    };

    window.addEventListener("lumiere-storage", syncCart);

    return () => {
      window.removeEventListener("lumiere-storage", syncCart);
    };
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    setStorage("lumiere_cart", updatedCart);
    window.dispatchEvent(new Event("lumiere-storage"));
  };

  const increaseQuantity = (id, size, color) => {
    const updatedCart = cart.map((item) => {
      if (
        item.id === id &&
        item.size === size &&
        item.color === color
      ) {
        const stock = item.stock ?? 99;

        if (item.quantity >= stock) {
          toast.error("Maximum available stock reached");
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id, size, color) => {
    const updatedCart = cart.map((item) => {
      if (
        item.id === id &&
        item.size === size &&
        item.color === color
      ) {
        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      }

      return item;
    });

    updateCart(updatedCart);
  };

  const removeItem = (id, size, color) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.id === id &&
          item.size === size &&
          item.color === color
        )
    );

    updateCart(updatedCart);
    toast.success("Product removed from bag");
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 120;
  const total = subtotal + shipping;

  const formatPrice = (price) =>
    `৳${price.toLocaleString("en-BD")}`;

  if (cart.length === 0) {
    return (
      <section className="min-h-[65vh] bg-white py-20">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F8F5F0]">
              <FiShoppingBag className="text-4xl text-[#C8A98B]" />
            </div>

            <h1 className="font-serif text-3xl text-[#171717]">
              Your Bag Is Empty
            </h1>

            <p className="mt-3 text-sm leading-7 text-neutral-500">
              Looks like you haven't added anything to your
              shopping bag yet. Discover something beautiful.
            </p>

            <Link
              to="/shop"
              className="mt-8 bg-[#171717] px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#C8A98B]"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12 sm:py-16">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A98B]">
            Your Selection
          </p>

          <h1 className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
            Shopping Bag
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            You have {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            item(s) in your bag.
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="hidden grid-cols-[1fr_120px_100px] border-b border-neutral-200 pb-4 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:grid">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            <div className="divide-y divide-neutral-200">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="grid gap-4 py-6 sm:grid-cols-[1fr_120px_100px] sm:items-center"
                >
                  <div className="flex min-w-0 gap-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="h-32 w-24 shrink-0 overflow-hidden bg-[#F8F5F0] sm:h-36 sm:w-28"
                    >
                      <img
                        src={imageUrl(item.images?.[0])}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="min-w-0 py-1">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-400">
                        {item.category}
                      </p>

                      <Link
                        to={`/product/${item.id}`}
                        className="mt-2 block text-sm font-medium text-[#171717] hover:text-[#C8A98B]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-xs text-neutral-500">
                        Size: {item.size}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        Color: {item.color}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#171717] sm:hidden">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      <button
                        onClick={() =>
                          removeItem(item.id, item.size, item.color)
                        }
                        className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-neutral-400 transition hover:text-red-500"
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-center">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.size, item.color)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center border border-neutral-200 transition hover:border-[#171717] disabled:opacity-40"
                    >
                      <FiMinus size={12} />
                    </button>

                    <span className="min-w-5 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.size, item.color)
                      }
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center border border-neutral-200 transition hover:border-[#171717]"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>

                  <p className="hidden text-right text-sm font-semibold text-[#171717] sm:block">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/shop"
              className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-500 transition hover:text-[#C8A98B]"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>

          <aside className="bg-[#F8F5F0] p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-[#171717]">
              Order Summary
            </h2>

            <div className="mt-7 space-y-5 border-b border-neutral-300 pb-6 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-neutral-500">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              {subtotal > 0 && subtotal < 5000 && (
                <p className="text-xs leading-5 text-neutral-500">
                  Add {formatPrice(5000 - subtotal)} more to get free shipping.
                </p>
              )}
            </div>

            <div className="flex justify-between gap-3 py-6">
              <span className="font-semibold text-[#171717]">
                Total
              </span>

              <span className="text-lg font-semibold text-[#171717]">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="flex w-full items-center justify-center bg-[#171717] py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white! transition hover:bg-[#C8A98B]"
            >
              Proceed To Checkout
            </Link>

            <p className="mt-5 text-center text-[10px] leading-5 text-neutral-400">
              Shipping and payment details will be confirmed at checkout.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
