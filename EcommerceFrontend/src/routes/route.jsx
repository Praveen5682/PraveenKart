import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/sessions/Login";
import Signup from "../pages/sessions/Signup";
import ForgetPassword from "../pages/sessions/ForgetPassword";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import AdminLayout from "../layouts/AdminLayout"; // Admin Layout Wrapper
import Dashboard from "../pages/adminPanel/dashboard/Dashboard";
import AddProducts from "../pages/adminPanel/products/AddProducts";
import AllProducts from "../pages/adminPanel/products/AllProducts";
import Categories from "../pages/adminPanel/products/Categories";
import SubCategory from "../pages/adminPanel/products/SubCategory";
import AddSpecifications from "../pages/adminPanel/products/AddSpecifications";
import Banner from "../pages/adminPanel/banner/Banner";
import SubCategoryPageView from "../page-sections/sub-category.jsx/page-view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main App Layout
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "product-details/:productid", element: <ProductDetails /> },
      { path: "signup", element: <Signup /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "cart", element: <Cart /> },
      { path: "SubCategory/:categoryid", element: <SubCategoryPageView /> },
    ],
  },

  // Separate Admin Panel
  {
    path: "/dashboard",
    element: <AdminLayout />, // Admin Layout Wrapper
    children: [
      { path: "", element: <Dashboard /> }, // Default admin page
      { path: "orders", element: "<Orders />" }, // Orders Page
      { path: "add-product", element: <AddProducts /> }, // Add Product Page
      { path: "all-products", element: <AllProducts /> }, // Add Product Page
      { path: "categories", element: <Categories /> }, // Add Product Page
      { path: "sub-categories", element: <SubCategory /> }, // Add Product Page
      { path: "specifications", element: <AddSpecifications /> },

      // Banner
      { path: "banner", element: <Banner /> },
    ],
  },
]);

export default router;
