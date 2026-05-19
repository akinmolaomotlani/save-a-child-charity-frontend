import { useState } from "react";
import PageNav from "../components/PageNav";
import donationBg from "../images/donate.jpg";
import Footer from "./Footer";
import Loader from "../components/Loading";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDonate = () => {
    setErrorMsg("");

    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Enter a valid amount");
      return;
    }

    if (!name || !email) {
      setErrorMsg("Fill all fields");
      return;
    }

    const paystack = window.PaystackPop;

    const handler = paystack.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: Number(amount) * 100,
      currency: "NGN",

      ref: `${Date.now()}`,

      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: name,
          },
        ],
      },

      callback: function (response) {
        console.log(response);

        fetch(
          "https://save-a-child-charity-backend.onrender.com/api/payments/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              reference: response.reference,
              name,
              email,
              amount,
            }),
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              alert("Donation successful");
            } else {
              setErrorMsg("Verification failed");
            }
          });
      },

      onClose: function () {
        setLoading(false);
      },
    });

    handler.openIframe();
  };
  return (
    <>
      <PageNav />

      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 relative">
          <div className="p-8 md:p-12 space-y-8">
            <h2 className="text-3xl font-semibold">Complete Your Donation</h2>

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

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <button
              onClick={handleDonate}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl flex justify-center"
            >
              {loading ? <Loader /> : "Donate Securely"}
            </button>
          </div>

          <div className="hidden md:block relative">
            <img src={donationBg} className="w-full h-full object-cover" />
          </div>

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
