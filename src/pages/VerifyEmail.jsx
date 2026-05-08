import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const res = await fetch(
          `https://save-a-child-charity-backend.onrender.com/api/auth/verify?token=${token}`,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        setStatus("success");
        setMessage(data.message || "Email verified successfully");
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Something went wrong");
      }
    };

    verify();
  }, [searchParams]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] flex items-center justify-center px-4">
      {/* Smoky White Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-white/60 blur-3xl rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-gray-200/50 blur-3xl rounded-full" />

      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-slate-200 opacity-90" />

      {/* Floating Blur Layer */}
      <div className="absolute top-[20%] left-[35%] w-[300px] h-[300px] bg-white/40 blur-3xl rounded-full" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/50 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-3xl p-8 text-center">
          {/* Loading */}
          {status === "loading" && (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-4 border-blue-400 border-t-orange-400 animate-spin mb-6" />

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Verifying...
              </h2>

              <p className="text-gray-500 text-sm">
                Please wait while we verify your email address
              </p>
            </div>
          )}

          {/* Success */}
          {status === "success" && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 border border-green-200">
                <span className="text-5xl text-green-500">✓</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Verification Successful
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">{message}</p>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:scale-[1.02] transition-all duration-300 text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                Continue to Login →
              </button>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-6 border border-red-200">
                <span className="text-5xl text-red-500">✕</span>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Verification Failed
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">{message}</p>

              <button
                onClick={() => navigate("/register")}
                className="w-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-800 py-3 rounded-xl font-semibold"
              >
                Back to Signup
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Secure verification powered by Save A Child
        </p>
      </div>
    </div>
  );
}
