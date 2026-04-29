import { useState } from "react";
import PageNav from "../components/PageNav";
import donationBg from "../images/donate.jpg";
import Footer from "./Footer";
import Loader from "../components/Loading";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleDonate = async () => {
    setErrorMsg("");

    if (!stripe || !elements) return;

    // ✅ validation
    if (!amount || amount <= 0) {
      setErrorMsg("Please enter a valid donation amount");
      return;
    }

    if (!name || !email) {
      setErrorMsg("Please fill in your name and email");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMsg("Card details not found");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create Payment Method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      // 2️⃣ Call backend
      const res = await fetch(
        "http://save-a-child-charity-backend.onrender.com/api/payments/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            paymentMethodId: paymentMethod.id,
            donorName: name,
            email,
          }),
        },
      );

      const data = await res.json();

      if (!data.clientSecret) {
        throw new Error("No client secret returned");
      }

      // ✅ 3️⃣ Confirm payment (🔥 FIXED HERE)
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setErrorMsg(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ Donation successful!");
        setAmount("");
        setName("");
        setEmail("");
        elements.getElement(CardElement).clear();
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      setErrorMsg(err.message); // ✅ show real error
    }

    setLoading(false);
  };

  return (
    <>
      <PageNav />

      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 relative">
          {/* LEFT */}
          <div className="p-8 md:p-12 space-y-8">
            <h2 className="text-3xl font-semibold">Complete Your Donation</h2>

            {/* Amount buttons */}
            <div className="grid grid-cols-3 gap-3">
              {["10", "25", "50", "100", "250"].map((amt, i) => (
                <button
                  key={i}
                  onClick={() => setAmount(amt)}
                  className={`border rounded-xl py-3 ${
                    amount === amt ? "border-orange-500 text-orange-500" : ""
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <input
              type="number"
              placeholder="Donation Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-xl"
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-xl"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl"
            />

            {/* Card */}
            <div className="p-4 border rounded-xl">
              <CardElement />
            </div>

            {/* ERROR */}
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            {/* BUTTON */}
            <button
              onClick={handleDonate}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl flex justify-center"
            >
              {loading ? <Loader /> : "Donate Securely"}
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block relative">
            <img src={donationBg} className="w-full h-full object-cover" />
          </div>

          {/* FULL LOADER */}
          {loading && (
            <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
              <Loader />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
