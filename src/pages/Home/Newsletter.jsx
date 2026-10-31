import { useState } from "react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    const savedEmails = JSON.parse(
      localStorage.getItem("lumiere_newsletter") || "[]",
    );

    if (savedEmails.includes(email.trim().toLowerCase())) {
      toast.error("You are already subscribed!");
      return;
    }

    savedEmails.push(email.trim().toLowerCase());

    localStorage.setItem("lumiere_newsletter", JSON.stringify(savedEmails));

    toast.success("Thank you for subscribing!");

    setEmail("");
  };

  return (
    <section className="bg-[#F8F5F0] py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <FiMail className="text-2xl text-[#C8A98B]" />
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#C8A98B]">
            Stay In The Know
          </p>

          <h2 className="font-serif text-3xl leading-tight text-[#171717] sm:text-5xl">
            A Little More
            <br />
            <span className="italic">Shifa-fashion</span> In Your Inbox.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-neutral-500">
            Subscribe to receive exclusive offers, new arrivals and fashion
            inspiration delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="min-w-0 flex-1 border border-[#e5ddd4] bg-white px-5 py-4 text-sm outline-none transition focus:border-[#C8A98B]"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 bg-[#171717] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#C8A98B]"
            >
              Subscribe <FiArrowRight size={16} />
            </button>
          </form>

          <p className="mt-5 text-[10px] text-neutral-400">
            By subscribing, you agree to receive emails from Shifa-fashion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Newsletter;
