import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";

import Home from "./modules/home/screens/Home";
import ProductList from "./modules/product/screens/ProductList";
import ProductDetail from "./modules/product/screens/ProductDetail";
import Cart from "./modules/cart/screens/Cart";
import Checkout from "./modules/checkout/screens/Checkout";
import Login from "./modules/auth/screens/Login";
import Register from "./modules/auth/screens/Register";
import Dashboard from "./modules/dashboard/screens/Dashboard";

function App() {
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