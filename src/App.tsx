import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SingleProduct from "./pages/SingleProduct";
import UserSetting from "./pages/UserSetting";
import OrderPage from "./pages/OrderPage";
import ShippingAddress from "./pages/ShippingAddress";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductsSearch from "./pages/ProductsSearch";
import AdminProductPage from "./pages/admin/AdminProductPage";
import AdminOrderPage from "./pages/admin/AdminOrderPage";
import AdminUpdateProd from "./pages/admin/AdminUpdateProd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/product/:slug" Component={SingleProduct} />
        <Route path="/user-setting" Component={UserSetting} />;
        <Route path="/my-order/:id" Component={OrderPage} />
        <Route path="/shipping-address" Component={ShippingAddress} />;
        <Route path="/place-order" Component={PlaceOrderPage} />;
        <Route path="/search" Component={ProductsSearch} />;
        <Route path="/dashboard/orders" Component={AdminOrderPage} />;
        <Route path="/dashboard/products" Component={AdminProductPage} />;
        <Route path="/dashboard/edit/:slug" Component={AdminUpdateProd} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
