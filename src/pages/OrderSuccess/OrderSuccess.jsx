
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiCheck,
  FiPackage,
  FiShoppingBag,
  FiArrowRight,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";
import Container from "../../components/common/Container";
import { getStorage } from "../../utils/localStorage";

function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = getStorage("lumiere_orders", []);
    const foundOrder = orders.find((item) => item.id === id);
    setOrder(foundOrder || null);
  }, [id]);

  if (!order) {
    return (
      <main className="min-h-[70vh] bg-[#F8F5F0] flex items-center justify-center px-4">
        <div className="text-center">
          <FiPackage className="mx-auto text-5xl text-[#C8A98B] mb-5" />
          <h1 className="font-serif text-3xl text-[#171717] mb-3">
            Order Not Found
          </h1>
          <p className="text-gray-500 mb-7">
            We couldn't find this order. Please check your order details.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#171717] text-white! px-7 py-3 text-sm hover:bg-[#C8A98B] transition"
          >
            Continue Shopping <FiArrowRight />
          </Link>
        </div>
      </main>
    );
  }

  const formatPrice = (price) =>
    `৳${Number(price || 0).toLocaleString("en-BD")}`;

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="bg-[#F8F5F0] min-h-screen py-14 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 md:p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-7">
              <FiCheck className="text-4xl text-green-600" />
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-[#C8A98B] mb-3">
              Order Confirmation
            </p>

            <h1 className="font-serif text-3xl md:text-5xl text-[#171717] mb-4">
              Thank You for Your Order!
            </h1>

            <p className="text-gray-500 text-sm leading-7 max-w-lg mx-auto">
              Your order has been placed successfully. We're getting everything
              ready for you. You will receive your products soon.
            </p>

            <div className="border-y border-gray-100 my-9 py-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Your Order Number
              </p>
              <p className="text-xl font-semibold tracking-wider text-[#171717]">
                {order.id}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Ordered on {orderDate}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
              <div className="bg-[#F8F5F0] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin className="text-[#C8A98B]" />
                  <h3 className="text-sm font-semibold">Delivery Address</h3>
                </div>
                <p className="text-sm text-gray-600">{order.fullName}</p>
                <p className="text-sm text-gray-500 mt-1">{order.address}</p>
                <p className="text-sm text-gray-500">
                  {order.city}, {order.district} {order.postalCode}
                </p>
                <p className="text-sm text-gray-500 mt-1">{order.phone}</p>
              </div>

              <div className="bg-[#F8F5F0] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiCreditCard className="text-[#C8A98B]" />
                  <h3 className="text-sm font-semibold">Payment Details</h3>
                </div>
                <p className="text-sm text-gray-600">
                  {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Payment Status: {order.paymentStatus}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Order Status: {order.status}
                </p>
              </div>
            </div>

            <div className="text-left border border-gray-100 p-5 md:p-6">
              <h3 className="font-serif text-xl mb-5">Order Summary</h3>

              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-20 bg-[#F8F5F0] shrink-0">
                      <img
                        src={`https://images.unsplash.com/${item.images?.[0]}?auto=format&fit=crop&w=200&q=80`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#171717]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-6 pt-5 space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : formatPrice(order.shipping)}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-[#171717] text-white! px-7 py-3.5 text-sm hover:bg-[#C8A98B] transition"
              >
                <FiShoppingBag /> Continue Shopping
              </Link>

              <Link
                to="/account"
                className="inline-flex items-center justify-center gap-2 border border-[#171717] text-[#171717] px-7 py-3.5 text-sm hover:bg-[#171717] hover:text-white! transition"
              >
                My Account <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default OrderSuccess;
