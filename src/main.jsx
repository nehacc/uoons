import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Homepage from './pages/Homepage.jsx';
import ProductList from './pages/ProductList.jsx'
import ProductDescription from './pages/ProductDescription'
import ProductDescriptionTest from './pages/ProductDescriptionTest'
import Faq from './pages/Faq.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import Timeline from './pages/Timeline.jsx'
import WishList from './pages/Wishlist.jsx';
import ContactUs from './pages/ContactUs.jsx';
import AddToCart from './pages/AddToCart.jsx';
import LoginSignup from './pages/LoginSignup.jsx'
import HomepageAds from './pages/HomepageAds.jsx';
import Test from './pages/Test.jsx';
import Profile from './pages/Profile.jsx';
import SpecificCategorieProduct from './components/SpecificCategorieProduct.jsx';
import ToastContainer from './components/ToastContainer'
import PdTest from './pages/PdTest.jsx'
import NewProfile from './pages/NewProfile.jsx';
import Checkout from './pages/Checkout.jsx'
import Checkout1 from './pages/Checkout1.jsx'
import CheckoutMulti from './pages/CheckoutMulti.jsx'
import ThankYouPage from './pages/ThankyouPage.jsx';
import ProductListSearch from './pages/ProductListSearch.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>, 
)
