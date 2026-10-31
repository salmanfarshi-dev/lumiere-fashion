
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import { getStorage, setStorage } from "../../utils/localStorage";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart] = useState(() => getStorage("lumiere_cart", []));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    paymentMethod: "cod",
    orderNotes: "",
  });

  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 120;
  const total = subtotal + shipping;

  const formatPrice = (price) =>
    `৳${price.toLocaleString("en-BD")}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your shopping bag is empty");
      return;
    }

    setLoading(true);

    const order = {
      id: `LUM-${Date.now()}`,
      ...formData,
      items: cart,
      subtotal,
      shipping,
      total,
      status: "Pending",
      paymentStatus: "Unpaid",
      paymentMethod: "Cash on Delivery",
      createdAt: new Date().toISOString(),
    };

    const existingOrders = getStorage("lumiere_orders", []);

    setStorage("lumiere_orders", [
      order,
      ...existingOrders,
    ]);

    setStorage("lumiere_cart", []);

    window.dispatchEvent(new Event("lumiere-storage"));

    toast.success("Your order has been placed successfully!");

    setTimeout(() => {
      navigate(`/order-success/${order.id}`);
    }, 700);
  };

  if (cart.length === 0) {
    return (
      <section className="min-h-[65vh] py-20">
        <Container>
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <FiShoppingBag className="mb-5 text-5xl text-[#C8A98B]" />

            <h1 className="font-serif text-3xl">
              Your Bag Is Empty
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              Add some beautiful pieces before proceeding to checkout.
            </p>

            <Link
              to="/shop"
              className="mt-7 bg-[#171717] px-8 py-4 text-xs uppercase tracking-widest text-white hover:bg-[#C8A98B]"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const inputClass =
    "mt-2 w-full border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C8A98B]";

  const labelClass =
    "text-[10px] font-semibold uppercase tracking-widest text-neutral-600";

  return (
    <section className="min-h-screen bg-white py-12 sm:py-16">
      <Container>
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A98B]">
            Almost Yours
          </p>

          <h1 className="mt-3 font-serif text-3xl text-[#171717] sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Complete your details to place your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid items-start gap-10 lg:grid-cols-[1fr_380px]"
        >
          {/* Customer Information */}
          <div className="space-y-9">

            <div>
              <h2 className="mb-6 font-serif text-2xl">
                Contact Information
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Full Name *
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                    required
                  />
                </label>

                <label className={labelClass}>
                  Email Address *
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={inputClass}
                    required
                  />
                </label>

                <label className={labelClass}>
                  Phone Number *
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    pattern="01[0-9]{9}"
                    title="Enter a valid 11-digit Bangladesh mobile number"
                    className={inputClass}
                    required
                  />
                </label>

                <label className={labelClass}>
                  Alternative Phone
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    placeholder="Optional phone number"
                    className={inputClass}
                  />
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h2 className="mb-6 font-serif text-2xl">
                Delivery Address
              </h2>

              <div className="space-y-5">
                <label className={labelClass}>
                  Full Address *
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House, Road, Area and other details"
                    rows={3}
                    className={inputClass}
                    required
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>
                    City *
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className={inputClass}
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    District *
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Your district"
                      className={inputClass}
                      required
                    />
                  </label>

                  <label className={labelClass}>
                    Postal Code
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="mb-6 font-serif text-2xl">
                Payment Method
              </h2>

              <label className="flex cursor-pointer items-start gap-4 border border-[#C8A98B] bg-[#F8F5F0] p-5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="mt-1 accent-[#C8A98B]"
                />

                <span>
                  <span className="block text-sm font-semibold text-[#171717]">
                    Cash On Delivery
                  </span>

                  <span className="mt-1 block text-xs text-neutral-500">
                    Pay when your order arrives at your doorstep.
                  </span>
                </span>
              </label>
            </div>

            {/* Order Notes */}
            <div>
              <h2 className="mb-5 font-serif text-2xl">
                Additional Notes
              </h2>

              <textarea
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                placeholder="Any special instructions for delivery? (Optional)"
                rows={3}
                className={inputClass}
              />
            </div>
          </div>

          {/* Order Summary */}
          <aside className="bg-[#F8F5F0] p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl text-[#171717]">
              Your Order
            </h2>

            <div className="mt-7 space-y-5 border-b border-neutral-300 pb-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  <div className="relative h-20 w-16 shrink-0 bg-white">
                    <img
                      src={`https://images.unsplash.com/${item.images?.[0]}?auto=format&fit=crop&w=200&q=80`}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#171717]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      Size: {item.size} / Color: {item.color}
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-b border-neutral-300 py-6 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-500">Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-6">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-semibold">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 bg-[#171717] py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#C8A98B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiCheckCircle />
              {loading ? "Processing..." : "Place Your Order"}
            </button>

            <p className="mt-5 text-center text-[10px] leading-5 text-neutral-400">
              By placing your order, you agree to our Terms & Conditions.
            </p>
          </aside>
        </form>

        <Link
          to="/cart"
          className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-500 hover:text-[#C8A98B]"
        >
          <FiArrowLeft />
          Return To Shopping Bag
        </Link>
      </Container>
    </section>
  );
};

export default Checkout;
