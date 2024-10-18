import "./index.css";
import AddToCart from "./pages/AddToCart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Checkout1 from "./pages/Checkout1.jsx";
import CheckoutMulti from "./pages/CheckoutMulti.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Faq from "./pages/Faq.jsx";
import Homepage from "./pages/Homepage.jsx";
import HomepageAds from "./pages/HomepageAds.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import MyOrders2 from "./pages/MyOrders2.jsx";
import NewProfile from "./pages/NewProfile.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import PdTest from "./pages/PdTest.jsx";
import ProductDescription from "./pages/ProductDescription";
import ProductDescriptionTest from "./pages/ProductDescriptionTest";
import ProductList from "./pages/ProductList.jsx";
import ProductListPriceStore from "./pages/ProductListPriceStore.jsx";
import ProductListSearch from "./pages/ProductListSearch.jsx";
import Profile from "./pages/Profile.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import SpecificCategorieProduct from "./components/SpecificCategorieProduct.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import Test from "./pages/Test.jsx";
import Test345 from "./pages/Test345.jsx";
import ThankYouPage from "./pages/ThankyouPage.jsx";
import Timeline from "./pages/Timeline.jsx";
import ToastContainer from "./components/ToastContainer";
import WishList from "./pages/Wishlist.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/test345",
    element: <Test345 />,
  },
  {
    path: "/home",
    element: <Homepage />,
  },
  {
    path: "/home2",
    element: <HomepageAds />,
  },
  {
    path: "/ProductList/:c_id",
    element: <ProductList />,
  },
  {
    path: "/ProductListPriceStore/:priceId",
    element: <ProductListPriceStore />,
  },
  
  {
    path: "/ProductListSearch",
    element: <ProductListSearch />,
  },
  {
    path: "/PdTest/:p_id",
    element: <PdTest />,
  },
  // {
  //   path: "/Checkout/:p_id",
  //   element: <Checkout />,
  // },
  {
    path: "/Checkout/:p_id",
    element: <CheckoutMulti />,
  },
  {
    path: "/ThankyouPage/:p_id",
    element: <ThankYouPage />,
  },
  {
    path: "/Faq",
    element: <Faq />,
  },
  {
    path: "/T&c",
    element: <TermsAndConditions />,
  },
  {
    path: "/timeline",
    element: <Timeline />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/ContactUs",
    element: <ContactUs />,
  },
  {
    path: "/AddToCart",
    element: <AddToCart />,
  },
  {
    path: "/auth",
    element: <LoginSignup />,
  },
  {
    path: "/homeAds",
    element: <HomepageAds />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/ProductDescription/:p_id",
    element: <ProductDescription />,
  },
  {
    path: "/ProductDescriptionTest",
    element: <ProductDescriptionTest />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/scpText",
    element: <SpecificCategorieProduct />,
  },
  {
    path: "ToastContainer",
    element: <ToastContainer />
  },
  {
    path: "NewProfile",
    element: <NewProfile />
  },
  {
    path: "Checkout",
    element: <Checkout />
  },
  {
    path: "Checkout1",
    element: <Checkout1 />
  },
  {
    path: "MyOrders",
    element: <MyOrders />
  },
  {
    path: "MyOrders2",
    element: <MyOrders2 />
  },
  {
    path: "/order-details/:orderId",
    element: <OrderDetails />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>, 
)
