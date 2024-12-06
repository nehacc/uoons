import { useState, useEffect } from 'react';

// components
import Navbar from '../components/Navbar'
import LowerNavbar from '../components/LowerNavbar';
import Slideshow from '../components/Slideshow';
import ProductsContainer from '../components/ProductsContainer';
import ProductsContainerMII from '../components/ProductsContainerMII';
import PriceStore from '../components/PriceStore.jsx';
import AdvertisementData from '../components/AdvertisementData.jsx'
import FooterN from '../components/FooterN';
// import Banner from '../components/Banner';
import BrandContainer from '../components/BrandContainer';

// for api calls
import axios from 'axios';

// for animation
import AOS from "aos";
import "aos/dist/aos.css";

// for popup notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





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

  // fetchHomePageData();
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
      console.log('error in fetching homepage data', err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  
  console.log("just checking!!",HomePageData)
    
  // for animation
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  if (loading) return <div className='flex justify-center items-center h-screen'>Loading...</div>;
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
      <FooterN />

      {/* for popup notification */}
      <ToastContainer />

    </div>
    </>
  )
  
}

export default Homepage
