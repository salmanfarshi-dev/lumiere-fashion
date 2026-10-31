import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import Container from "../../components/common/Container";
import { getStorage, setStorage } from "../../utils/localStorage";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    setLoading(true);

    const newMessage = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    const messages = getStorage("lumiere_messages", []);

    setStorage("lumiere_messages", [...messages, newMessage]);

    toast.success("Your message has been submitted!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setLoading(false);
  };

  return (
    <main className="bg-[#F8F5F0] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[350px] md:h-[430px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90"
          alt="Contact Shifa-fashion Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
          <div className="text-white">
            <p className="text-xs tracking-[0.35em] uppercase mb-5">
              We'd Love to Hear From You
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mb-5">Contact Us</h1>

            <p className="text-sm md:text-base text-white/85">
              Have a question? We're always happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-2">
              <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-4">
                Get In Touch
              </p>

              <h2 className="font-serif text-4xl md:text-5xl text-[#171717] leading-tight mb-6">
                Let's Start a Conversation.
              </h2>

              <p className="text-sm text-gray-500 leading-8 mb-10">
                Whether you have a question about our products, your order, or
                anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
                    <FiMapPin className="text-xl text-[#C8A98B]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#171717] mb-2">
                      Our Location
                    </h3>
                    <p className="text-sm text-gray-500">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
                    <FiMail className="text-xl text-[#C8A98B]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#171717] mb-2">
                      Email Address
                    </h3>
                    <a
                      href="mailto:hello@lumiere.com"
                      className="text-sm text-gray-500 hover:text-[#B18A68] transition"
                    >
                      hello@lumiere.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
                    <FiPhone className="text-xl text-[#C8A98B]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#171717] mb-2">
                      Phone Number
                    </h3>
                    <a
                      href="tel:+8801000000000"
                      className="text-sm text-gray-500 hover:text-[#B18A68] transition"
                    >
                      +880 1000-000000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
                    <FiClock className="text-xl text-[#C8A98B]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#171717] mb-2">
                      Working Hours
                    </h3>
                    <p className="text-sm text-gray-500">Saturday – Thursday</p>
                    <p className="text-sm text-gray-500">10:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white p-6 md:p-10 shadow-sm">
              <div className="mb-8">
                <p className="text-xs tracking-[0.3em] uppercase text-[#B18A68] mb-3">
                  Send Us a Message
                </p>

                <h2 className="font-serif text-3xl md:text-4xl text-[#171717]">
                  We'd Love to Help
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Your Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={80}
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#C8A98B] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#C8A98B] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Subject *
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="What is your message about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={120}
                    className="w-full border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#C8A98B] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Your Message *
                  </label>

                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2000}
                    className="w-full border border-gray-200 px-4 py-3.5 text-sm outline-none focus:border-[#C8A98B] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#171717] text-white px-9 py-4 text-xs tracking-widest uppercase hover:bg-[#C8A98B] transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <FiSend />
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Banner */}
      <section className="bg-white py-14">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-[#171717]">
              Your Style, Our Passion.
            </h2>

            <p className="text-sm text-gray-500 mt-3">
              Thank you for being a part of our fashion journey.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default Contact;
