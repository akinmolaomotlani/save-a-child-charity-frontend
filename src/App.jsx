import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

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
import MessageUI from "./pages/MessageUI";
import AdminUI from "./pages/AdminUI";

// Loader
import Loader from "./components/Loading";

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

            {/* ✅ Stripe wrapped route */}
            <Route
              path="/donate"
              element={
                <Elements stripe={stripePromise}>
                  <Donate />
                </Elements>
              }
            />

            <Route path="/getinvolve" element={<GetInvolved />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route
              path="/messages/:id"
              element={
                <ProtectedRoute>
                  <MessageUI />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/admin/dashboard" element={<AdminUI />} />
          </Routes>
        </RouteChangeTracker>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
