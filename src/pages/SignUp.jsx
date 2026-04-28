import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agree) {
      toast.error("You must agree to the terms");
      return;
    }

    try {
      setLoading(true);

      // ✅ API CALL
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      // ❌ HANDLE ERROR
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ SAVE TOKEN (if returned)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ LOGIN USER (VERY IMPORTANT - AFTER SUCCESS)
      login(data);

      // ✅ SUCCESS MESSAGE
      toast.success("Account created successfully");

      // ✅ REDIRECT TO DASHBOARD
      navigate("/user/dashboard");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageNav />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={name}
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                disabled={loading}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* TERMS */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agree}
                disabled={loading}
                onChange={() => setAgree(!agree)}
              />
              <span className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  terms and conditions
                </a>
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
