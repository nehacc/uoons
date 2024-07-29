import React from 'react';
import { FaApple, FaGooglePlay, FaWhatsapp, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaBlogger, FaInstagramSquare, FaRegCopyright } from 'react-icons/fa';
import { FiTruck, FiPhone, FiMessageCircle, FiGift } from 'react-icons/fi';
import Logo from '../assets/xlLogoUoons.png';

const Footer = () => {
  return (
    <div className="bg-gray-100 py-8">
      {/* Top Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-sm">
          <div className="footer-icon mb-4">
            <FiTruck className="text-2xl mb-2 text-blue-500 mx-auto" />
            <div>Free Shipping</div>
            <div>When you spend ₹50,000+</div>
          </div>
          <div className="footer-icon mb-4">
            <FiPhone className="text-2xl mb-2 text-blue-500 mx-auto" />
            <div>Call Us Anytime</div>
            <div>+34 555 5555</div>
          </div>
          <div className="footer-icon mb-4">
            <FiMessageCircle className="text-2xl mb-2 text-blue-500 mx-auto" />
            <div>Chat With Us</div>
            <div>We offer 24-hour chat support</div>
          </div>
          <div className="footer-icon mb-4">
            <FiGift className="text-2xl mb-2 text-blue-500 mx-auto" />
            <div>Gift Cards</div>
            <div>For your loved one, in any amount</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 mx-auto w-4/5 border-gray-300" />

      {/* Links Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="footer-section mb-4">
            <img src={Logo} alt="Uoons Logo" className="footer-logo mb-4 mx-auto" style={{ maxWidth: '100px' }} />
            <p className="text-gray-700 text-sm">
              <strong>Registered Office Address:</strong><br />
              171 Devi Ahilya Marg, GFL 12, Jail Road, Indore - 452007, Madhya Pradesh, India.<br />
              Email: <a href="mailto:care@uoons.com" className="text-blue-600">care@uoons.com</a><br />
              Please note that you are accessing the BETA version of www.uoons.com. Should you encounter any bugs, lack of functionality, glitches, delayed deliveries, billing errors, or any other problems on this beta website, please write to us at <a href="mailto:care@uoons.com" className="text-blue-600">care@uoons.com</a>.
            </p>
          </div>
          <div className="footer-section mb-4">
            <h2 className="text-gray-800 text-lg mb-4">INFORMATION</h2>
            <ul className="text-gray-700 text-sm">
              <li><a href="#about" className="text-blue-600">About Us</a></li>
              <li><a href="#contact" className="text-blue-600">Contact Us</a></li>
              <li><a href="#privacy" className="text-blue-600">Privacy Policy</a></li>
              <li><a href="#terms" className="text-blue-600">Terms & Conditions</a></li>
              <li><a href="#faq" className="text-blue-600">FAQ</a></li>
              <li><a href="#returns" className="text-blue-600">Returns</a></li>
              <li><a href="#gifts" className="text-blue-600">Gift Certificates</a></li>
              <li><a href="#blogs" className="text-blue-600">Blogs</a></li>
            </ul>
          </div>
          <div className="footer-section mb-4">
            <h2 className="text-gray-800 text-lg mb-4">MY ACCOUNT</h2>
            <ul className="text-gray-700 text-sm">
              <li><a href="#profile" className="text-blue-600">User Profile</a></li>
              <li><a href="#orders" className="text-blue-600">Order History</a></li>
              <li><a href="#wishlist" className="text-blue-600">Wish List</a></li>
              <li><a href="#newsletter" className="text-blue-600">Newsletter</a></li>
              <li><a href="#affiliate" className="text-blue-600">Affiliate</a></li>
              <li><a href="#international" className="text-blue-600">International Orders</a></li>
            </ul>
          </div>
          <div className="footer-section mb-4">
            <h2 className="text-gray-800 text-lg mb-4">SERVICES</h2>
            <ul className="text-gray-700 text-sm">
              <li><a href="#franchise" className="text-blue-600">Franchise</a></li>
              <li><a href="#kiosk" className="text-blue-600">Kiosk</a></li>
              <li><a href="#repair" className="text-blue-600">Phone Repairing</a></li>
              <li><a href="#sales" className="text-blue-600">Sales & Services</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 mx-auto w-4/5 border-gray-300" />

      {/* App Download Section */}
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
          <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
            <FaApple className="footer-app-icon text-4xl text-gray-600 hover:text-blue-600" />
          </a>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <FaGooglePlay className="footer-app-icon text-4xl text-gray-600 hover:text-blue-600" />
          </a>
        </div>
      </div>

      {/* Contact Email */}
      <div className="container mx-auto px-4 text-center mt-4">
        <span className="footer-contact text-base text-orange-600 font-bold">care@Uoons.com</span>
      </div>

      {/* Social Media Icons */}
      <div className="container mx-auto px-4 text-center mt-4">
        <div className="grid grid-cols-7 gap-7 w-fit mx-auto">
          <FaWhatsapp className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
          <FaInstagram className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
          <FaTwitter className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
          <FaYoutube className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
          <FaLinkedin className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
          <FaBlogger className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
          <FaInstagramSquare className="footer-social-icon text-2xl text-gray-600 hover:text-blue-600" />
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 mx-auto w-4/5 border-gray-300" />

      {/* Footer Bottom */}
      <div className="container mx-auto px-4 text-center py-4">
        <span className="text-sm text-gray-700">Terms of Use | Copyright | Privacy Policy | Compliance</span>
        <div className="text-sm text-gray-700 mt-2">
          <FaRegCopyright className="inline-block mb-1 text-base text-gray-700" /> 2024 Uoons (INDIA) PRIVATE LIMITED. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
