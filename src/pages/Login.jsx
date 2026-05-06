import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 1. VALIDATION
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // ✅ 2. API CALL
      const res = await fetch(
        "https://save-a-child-charity-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await res.json();

      // ✅ 3. ERROR HANDLING
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ 4. SAVE TOKEN
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // ✅ 5. SAVE USER + ROLE
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role); // 👈 important
        localStorage.setItem("adminId", data.user.id);
      }

      // ✅ 6. SAVE TO CONTEXT
      if (typeof login === "function") {
        login(data);
      }

      toast.success("Login successful");

      // ✅ 7. ROLE-BASED REDIRECT
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageNav />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>

              <input
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
