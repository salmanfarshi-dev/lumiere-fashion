
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiArrowRight,
  FiShoppingBag,
  FiCalendar,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import { getStorage, removeStorage } from "../../utils/localStorage";

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() =>
    getStorage("lumiere_user", null)
  );
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

    setOrders(userOrders);
  }, [user, navigate]);

  const handleLogout = () => {
    removeStorage("lumiere_user");
    toast.success("You have been logged out.");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const memberSince = new Date().toLocaleDateString("en-BD", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F8F5F0] py-12 md:py-16">
      <Container>
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A98B] mb-3">
            Personal Dashboard
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#171717]">
            My Account
          </h1>

          <p className="text-sm text-gray-500 mt-3">
            Manage your account and keep track of your shopping activity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="lg:col-span-1">
            <div className="bg-white p-7 shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-5">
                <FiUser className="text-3xl text-[#C8A98B]" />
              </div>

              <div className="text-center mb-7">
                <h2 className="font-serif text-2xl text-[#171717]">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  {user.email}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiUser className="text-[#C8A98B]" />
                  <span>{user.name}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600 break-all">
                  <FiMail className="text-[#C8A98B] shrink-0" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiCalendar className="text-[#C8A98B]" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full mt-7 border border-red-200 text-red-500 py-3 flex items-center justify-center gap-2 text-sm hover:bg-red-50 transition"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-[#F8F5F0] flex items-center justify-center">
                    <FiPackage className="text-xl text-[#C8A98B]" />
                  </div>

                  <span className="text-3xl font-serif text-[#171717]">
                    {orders.length}
                  </span>
                </div>

                <h3 className="font-medium text-[#171717]">My Orders</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Your total placed orders
                </p>

                <Link
                  to="/orders"
                  className="inline-flex items-center gap-2 text-xs text-[#B18A68] mt-5 hover:underline"
                >
                  View Orders <FiArrowRight />
                </Link>
              </div>

              <div className="bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-[#F8F5F0] flex items-center justify-center">
                    <FiHeart className="text-xl text-[#C8A98B]" />
                  </div>

                  <span className="text-3xl font-serif text-[#171717]">
                    {getStorage("lumiere_wishlist", []).length}
                  </span>
                </div>

                <h3 className="font-medium text-[#171717]">My Wishlist</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Your saved favorite products
                </p>

                <Link
                  to="/wishlist"
                  className="inline-flex items-center gap-2 text-xs text-[#B18A68] mt-5 hover:underline"
                >
                  View Wishlist <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C8A98B] mb-2">
                    Shopping Activity
                  </p>

                  <h2 className="font-serif text-2xl text-[#171717]">
                    Recent Orders
                  </h2>
                </div>

                <FiShoppingBag className="text-2xl text-[#C8A98B]" />
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {[...orders].reverse().slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-[#171717]">
                          {order.id}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-BD"
                          )}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="text-sm font-medium">
                          ৳{Number(order.total).toLocaleString("en-BD")}
                        </span>

                        <span className="text-xs bg-[#F8F5F0] text-[#9B7959] px-3 py-1">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}

                  <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 text-sm text-[#B18A68] hover:underline pt-2"
                  >
                    View All Orders <FiArrowRight />
                  </Link>
                </div>
              ) : (
                <div className="text-center py-10 bg-[#F8F5F0]">
                  <FiPackage className="text-3xl text-[#C8A98B] mx-auto mb-4" />

                  <h3 className="font-serif text-xl text-[#171717]">
                    No Orders Yet
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 mb-5">
                    You haven't placed any orders yet.
                  </p>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-[#171717] text-white px-6 py-3 text-xs hover:bg-[#C8A98B] transition"
                  >
                    Start Shopping <FiArrowRight />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Account;
