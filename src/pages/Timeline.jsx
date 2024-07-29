import React from 'react';
import { FaRocket, FaFire, FaWrench, FaCog, FaChartLine } from 'react-icons/fa';
import { FaCogs, FaLightbulb, FaBalanceScale } from 'react-icons/fa';
import Header from '../components/Navbar';
import Footer from '../components/Footer';

const events = [
  { year: '2021', icon: <FaRocket />, title: 'THE JOURNEY BEGINS', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.', bgColor: 'bg-yellow-500' },
  { year: '2021', icon: <FaFire />, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.', bgColor: 'bg-blue-500' },
  { year: '2022', icon: <FaWrench />, title: 'ANDROID APPLICATION', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.', bgColor: 'bg-orange-500' },
  { year: '2022', icon: <FaCog />, title: 'SELLER PORTAL', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.', bgColor: 'bg-teal-500' },
  { year: '2023', icon: <FaChartLine />, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.', bgColor: 'bg-red-500' },
  { year: '2024', icon: <FaChartLine />, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.', bgColor: 'bg-green-500' },
];
const fundamentals = [
    {
      icon: <FaCogs className="text-5xl" />,
      title: 'EXECUTION',
      description: 'Managing by facts and timely action. Customer satisfaction policy.',
      bgColor: 'bg-red-500',
    },
    {
      icon: <FaLightbulb className="text-5xl" />,
      title: 'ENTREPRENEURSHIP',
      description: 'Identifying opportunities, passionate and taking ownership to provide best services.',
      bgColor: 'bg-green-500',
    },
    {
      icon: <FaBalanceScale className="text-5xl" />,
      title: 'ETHICAL PRACTICE',
      description: 'Strong and healthy relation with customer communities and focus on customer happiness with Ethical practice services.',
      bgColor: 'bg-orange-500',
    },
  ];

const Timeline = () => {
  return (
    <>
    <Header />
    <div className="flex flex-col items-center py-12 bg-blue-100">
      <h2 className="text-center text-4xl font-semibold mb-16 text-blue-800">ABOUT US</h2>

      <div className="relative w-full max-w-4xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} items-center w-full mb-8`}
          >
            <div className="flex flex-col items-center w-1/2 px-4">
              <div className={`w-12 h-12 ${event.bgColor} rounded-full flex items-center justify-center text-white text-2xl`}>
                {event.icon}
              </div>
              <div className="text-lg font-semibold mt-2">{event.year}</div>
            </div>
            <div className="w-1/2 px-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>

    <div className="py-16 bg-gray-50">
      <h2 className="text-center text-4xl font-semibold mb-16 text-blue-800">FOUNDER FUNDAMENTAL</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-4">
        {fundamentals.map((fundamental, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          >
            <div
              className={`w-20 h-20 flex items-center justify-center text-white rounded-full shadow-md ${fundamental.bgColor} mb-6`}
            >
              {fundamental.icon}
            </div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">{fundamental.title}</h3>
            <p className="text-center text-gray-600 max-w-xs">{fundamental.description}</p>
          </div>
        ))}
      </div>
    </div>

    </div>
    <Footer />
    </>
  );
};

export default Timeline;
