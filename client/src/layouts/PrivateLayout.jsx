import { Outlet, Navigate, useLocation } from "react-router-dom";

function PrivateLayout() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default PrivateLayout;