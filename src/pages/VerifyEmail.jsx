import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [status, setStatus] = useState("loading"); // loading | success | error
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold mb-2">Verifying...</h2>
            <p className="text-gray-500">Please wait</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-green-600 text-xl font-semibold mb-2">
              ✅ Success
            </h2>
            <p className="text-gray-700">{message}</p>

            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-red-600 text-xl font-semibold mb-2">
              ❌ Error
            </h2>
            <p className="text-gray-700">{message}</p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}
