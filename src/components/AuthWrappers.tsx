import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";
import { useBrokerStore } from "@/stores/brokerStore";

const Spinner = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

/*
 * Example: Login, Signup
 */
export const GuestRoute = () => {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const { status } = useBrokerStore();

  // wait for indexedDB to load
  if (!_hasHydrated) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    if (status === "approved") {
      return <Navigate to="/broker/dashboard" replace />;
    }

    return <Navigate to="/broker/awaiting-approval" replace />;
  }

  return <Outlet />;
};

/**
 * Example: Dashboard
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const location = useLocation();

  if (!_hasHydrated) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
