import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";

// ✅ Toast
import { Toaster } from "react-hot-toast";

// ✅ Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Pages
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Donate from "./pages/Donate";
import GetInvolved from "./pages/GetInvolved";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Volunteer from "./pages/Volunteer";

import AdminUI from "./pages/AdminUI";

// Loader
import Loader from "./components/Loading";
import EmailUI from "./pages/Email";

// Stripe key
const stripePromise = loadStripe(
  "pk_test_51TITWiAQYA5TUz9VNgQ4jnsB0exqSIfOrTYcy2K3fy5GPYpCXi2rNVJgFCjSNDDIBpG9239egkZRJaLuMhWn6miu00K7uqGtS6",
);

// Route Loader Wrapper
function RouteChangeTracker({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      {" "}
      <BrowserRouter>
        {/* ✅ GLOBAL TOAST (available everywhere) */}
        <Toaster position="top-right" reverseOrder={false} />

        <RouteChangeTracker>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutus" element={<AboutUs />} />

            <Route
              path="/donate"
              element={
                <ProtectedRoute>
                  <Elements stripe={stripePromise}>
                    <Donate />
                  </Elements>
                </ProtectedRoute>
              }
            />

            <Route
              path="/volunteer"
              element={
                <ProtectedRoute>
                  <Volunteer />
                </ProtectedRoute>
              }
            />

            <Route path="/getinvolve" element={<GetInvolved />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />

            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/email" element={<EmailUI />} />

            <Route path="/verify" element={<VerifyEmail />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminUI />
                </ProtectedRoute>
              }
            />
          </Routes>
        </RouteChangeTracker>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
