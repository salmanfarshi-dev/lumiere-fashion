import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import { getStorage, setStorage } from "../../utils/localStorage";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const users = getStorage("lumiere_users", []);

    if (isLogin) {
      const user = users.find(
        (item) => item.email === email && item.password === password,
      );

      if (!user) {
        toast.error("Invalid email or password!");
        return;
      }

      setStorage("lumiere_user", {
        name: user.name,
        email: user.email,
      });

      toast.success("Welcome back!");
      navigate("/account");
      return;
    }

    const name = formData.name.trim();

    if (name.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const alreadyExists = users.some((item) => item.email === email);

    if (alreadyExists) {
      toast.error("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    setStorage("lumiere_users", [...users, newUser]);

    setStorage("lumiere_user", {
      name: newUser.name,
      email: newUser.email,
    });

    toast.success("Account created successfully!");
    navigate("/account");
  };

  return (
    <main className="auth-page min-h-screen py-14 md:py-20">
      <Container>
        <div className="max-w-md mx-auto bg-white p-7 md:p-10 shadow-sm">
          <div className="text-center mb-9">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C8A98B] mb-3">
              Welcome to Shifa-fashion
            </p>

            <h1 className="font-serif text-3xl md:text-4xl text-[#171717]">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-sm text-gray-500 mt-3">
              {isLogin
                ? "Sign in to continue your shopping journey."
                : "Join us and discover your personal style."}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-[#F8F5F0] p-1 mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`py-3 text-sm transition ${
                isLogin ? "bg-white text-[#171717] shadow-sm" : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`py-3 text-sm transition ${
                !isLogin ? "bg-white text-[#171717] shadow-sm" : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Full Name
                </label>

                <div className="auth-input-wrapper">
                  <FiUser />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Email Address
              </label>

              <div className="auth-input-wrapper">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-gray-700">
                Password
              </label>

              <div className="auth-input-wrapper">
                <FiLock />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-eye-button"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#171717] text-white py-4 text-sm flex items-center justify-center gap-2 hover:bg-[#C8A98B] transition"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <FiArrowRight />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-7">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#B18A68] font-medium hover:underline"
            >
              {isLogin ? "Register Now" : "Login"}
            </button>
          </p>

          <div className="border-t border-gray-100 mt-7 pt-5 text-center">
            <Link
              to="/shop"
              className="text-xs text-gray-500 hover:text-[#C8A98B] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Auth;
