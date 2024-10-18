import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import AdvertisementData from "../components/AdvertisementData.jsx";
import BrandContainer from "../components/BrandContainer";
import LoadingComponent from "../components/LoadingComponent.jsx";
import LowerNavbar from "../components/LowerNavbar";
import Navbar from "../components/Navbar";
import PriceStore from "../components/PriceStore.jsx";
import ProductsContainer from "../components/ProductsContainer";
import ProductsContainerMII from "../components/ProductsContainerMII";
import React, { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import Test345 from "../pages/Test345.jsx";
import UserSession from "../user";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

 

// import Banner from '../components/Banner';
// import Footer from '../components/Footer'





const Homepage = () => {
  
  const [HomePageData, setHomePageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // additional
  const headings = {
    newArrival: "New Arrival",
    madeInIndia: "Made in India",
    bestSeller: "Best Seller",
    recentlyViewed: "Recently Viewed!",
    smartphonesTablets: "SmartPhones & Tablets"
  };

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await axios.get('/api/homepageData', {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            'Accept': '*/*',
            'channel-code': 'ANDROID'
          }
        });
        setHomePageData(response.data);
        setLoading(false);
      } catch (err) {
        console.log('error');
        setError(err);
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  if (loading) return <div><LoadingComponent/></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className="bg-white duration-200">
      <Navbar />
     
      <LowerNavbar />
        
      <Slideshow />
      <ProductsContainer heading={HomePageData.Data[3].name} data={HomePageData.Data[3].items}/>
      <PriceStore priceStoreData={HomePageData.Data[2]}/>
      <ProductsContainer heading={HomePageData.Data[5].name} data={HomePageData.Data[5].items}/>
      <AdvertisementData advertisementData={HomePageData.Data[6]} />
      <ProductsContainer heading={HomePageData.Data[9].name} data={HomePageData.Data[9].items}/>
      <ProductsContainer heading={HomePageData.Data[10].name} data={HomePageData.Data[10].items}/>
      <ProductsContainer heading={HomePageData.Data[11].name} data={HomePageData.Data[11].items}/>


      {/* additional */}
      <ProductsContainer heading={headings.newArrival} data={HomePageData.Data[3].items}/>
      {/* <Banner /> */}
      <ProductsContainerMII heading={headings.madeInIndia} data={HomePageData.Data[3].items}/>
      <ProductsContainer heading={headings.bestSeller} data={HomePageData.Data[3].items}/>

      <BrandContainer />
      <ProductsContainer heading={headings.recentlyViewed} data={HomePageData.Data[3].items}/>
      <ProductsContainer heading={headings.smartphonesTablets} data={HomePageData.Data[3].items}/>
      
      {/* <Footer /> */}
      <Test345 />
      <ToastContainer />
      
    </div>
      
    </>
  )
  
}

export default Homepage
