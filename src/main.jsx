import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
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
import Test2 from './pages/Test2.jsx'

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
    path: "/ProductList",
    element: <ProductList />,
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
    path: "/test2",
    element: <Test2 />,
  },
  {
    path: "/ProductDescription",
    element: <ProductDescription />,
  },
  {
    path: "/ProductDescriptionTest",
    element: <ProductDescriptionTest />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
