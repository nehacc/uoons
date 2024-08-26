import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import ProductsContainer from '../components/ProductsContainer';
import ProductsContainerMII from '../components/ProductsContainerMII';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import BrandContainer from '../components/BrandContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LowerNavbar from '../components/LowerNavbar';
import UserSession from '../user';

const Homepage = () => {
  const [HomePageData, setHomePageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            'Accept': '*/*',
            'channel-code': 'ANDROID'
          }
        });
        console.log('neha');
        setHomePageData(response.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err.response ? err.response.data : err.message);
        setError(err);
      } finally {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: Unable to load homepage data. Please try again later.</div>;

  return (
    <div className="bg-white duration-200">
      <Navbar />
      <LowerNavbar />
      <Slideshow />
      {HomePageData.Data && (
        <>
          <ProductsContainer heading={HomePageData.Data[3]?.name} data={HomePageData.Data[3]?.items} />
          <ProductsContainer heading={HomePageData.Data[5]?.name} data={HomePageData.Data[5]?.items} />
          <ProductsContainer heading={HomePageData.Data[9]?.name} data={HomePageData.Data[9]?.items} />
          <ProductsContainer heading={HomePageData.Data[10]?.name} data={HomePageData.Data[10]?.items} />
          <ProductsContainer heading={HomePageData.Data[11]?.name} data={HomePageData.Data[11]?.items} />
          <ProductsContainer heading={headings.newArrival} data={HomePageData.Data[3]?.items} />
          <Banner />
          <ProductsContainerMII heading={headings.madeInIndia} data={HomePageData.Data[3]?.items} />
          <ProductsContainer heading={headings.bestSeller} data={HomePageData.Data[3]?.items} />
          <BrandContainer />
          <ProductsContainer heading={headings.recentlyViewed} data={HomePageData.Data[3]?.items} />
          <ProductsContainer heading={headings.smartphonesTablets} data={HomePageData.Data[3]?.items} />
        </>
      )}
      <Footer />
      <ToastContainer />
      {console.log(UserSession.getAuth())}
    </div>
  );
};

export default Homepage;
