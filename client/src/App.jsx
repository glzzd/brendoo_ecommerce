import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";

// Main Site Screens
import Home from "./modules/home/screens/Home";
import ProductList from "./modules/product/screens/ProductList";
import ProductDetail from "./modules/product/screens/ProductDetail";
import Cart from "./modules/cart/screens/Cart";
import Checkout from "./modules/checkout/screens/Checkout";
import Login from "./modules/auth/screens/Login";
import Register from "./modules/auth/screens/Register";
import Dashboard from "./modules/dashboard/screens/Dashboard";

// Admin Site Screens
import AdminLayout from "./modules/admin/layouts/AdminLayout";
import AdminDashboard from "./modules/admin/screens/AdminDashboard";

function App() {
  // Subdomain check logic
  const hostname = window.location.hostname;
  // Handles 'admin.localhost', 'admin.site.com', etc.
  const isSubdomainAdmin = hostname.startsWith('admin.');

  if (isSubdomainAdmin) {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<AdminDashboard />} />
            {/* Add more admin routes here */}
            <Route path="*" element={<div className="p-10">404 - Admin Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/shop/:category" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
