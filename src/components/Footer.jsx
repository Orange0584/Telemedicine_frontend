import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaLinkedin,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    const excludedPaths = [
      "/login",
      "/signup",
      "/verify-doctor-profile",
      "/chat",
    ];
    const shouldHide =
      excludedPaths.includes(location.pathname) ||
      location.pathname.includes("/chat/");
    setIsHidden(shouldHide);
  }, [location]); // Re-run the effect whenever location changes

  return (
    <footer
      className={`${
        isHidden ? "hidden" : ""
      } text-black text-center md:text-start bg-gradient-to-tr from-purple-600 to-purple-50 border-t-2 mt-8 py-10 px-5 relative bottom-0`}
    >
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="mb-2">
              <Link to="/orders">Orders</Link>
            </li>
            <li className="mb-2">
              <Link to="/category/medicine">Medicines</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Reach Us</h4>
          <p>123 Medicine Street</p>
          <p>Pharmacy City, PC 12345</p>
          <p>Email: support@telemedicine.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaSquareFacebook size={25} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaSquareTwitter size={25} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaSquareInstagram size={25} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedin size={25} />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p>
          &copy; {new Date().getFullYear()} Telemedicine. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
