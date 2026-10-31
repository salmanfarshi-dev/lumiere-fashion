
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiArrowLeft,
  FiArrowRight,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";
import Container from "../../components/common/Container";
import { getStorage } from "../../utils/localStorage";

function Orders() {
  const navigate = useNavigate();
  const [user] = useState(() => getStorage("lumiere_user", null));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const allOrders = getStorage("lumiere_orders", []);

    const userOrders = allOrders.filter(
      (order) => order.email?.toLowerCase() === user.email?.toLowerCase()
    );

    setOrders(userOrders.reverse());
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const formatPrice = (price) =>
    `৳${Number(price || 0).toLocaleString("en-BD")}`;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-700";
      case "processing":
        return "bg-blue-50 text-blue-700";
      case "cancelled":
        return "bg-red-50 text-red-600";
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0] py-12 md:py-16">
      <Container>
        <div className="mb-10">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C8A98B] mb-7 transition"
          >
            <FiArrowLeft /> Back to My Account
          </Link>

          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A98B] mb-3">
            Your Shopping History
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#171717]">
            My Orders
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Track and manage all your previous orders.
          </p>
        </div>

        <div className="flex items-center justify-between bg-white p-5 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#F8F5F0] flex items-center justify-center">
              <FiPackage className="text-xl text-[#C8A98B]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#171717]">
                Order History
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {orders.length} {orders.length === 1 ? "Order" : "Orders"} Found
              </p>
            </div>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 md:p-7 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                      Order Number
                    </p>

                    <h3 className="font-medium text-[#171717]">
                      {order.id}
                    </h3>

                    <p className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <FiCalendar />
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-2 text-xs ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>

                    <span className="text-xs bg-gray-50 text-gray-600 px-3 py-2">
                      {order.paymentStatus || "Unpaid"}
                    </span>
                  </div>
                </div>

                <div className="py-5 space-y-4">
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

                      <p className="text-sm font-medium text-[#171717]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Total Amount
                    </p>

                    <p className="text-xl font-semibold text-[#171717]">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <Link
                    to={`/order-success/${order.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#171717] text-white px-6 py-3 text-xs hover:bg-[#C8A98B] transition"
                  >
                    View Order Details <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white text-center py-16 px-6 shadow-sm">
            <FiShoppingBag className="text-4xl text-[#C8A98B] mx-auto mb-5" />

            <h2 className="font-serif text-2xl md:text-3xl text-[#171717]">
              No Orders Found
            </h2>

            <p className="text-sm text-gray-500 mt-3 mb-7">
              You haven't placed any orders yet. Start exploring our collection!
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#171717] text-white px-7 py-3.5 text-sm hover:bg-[#C8A98B] transition"
            >
              <FiShoppingBag /> Start Shopping
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}

export default Orders;
