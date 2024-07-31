import React, { useEffect, useState } from 'react';
import api from './api';

const Homepage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomePageData = async () => {
    try {
      const response = await api.get('/homepageData', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'channel-code': 'ANDROID',
        },
        withCredentials: true
      });
      setHomePageData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div>{JSON.stringify(homePageData)}</div>;
};

export default Homepage;
