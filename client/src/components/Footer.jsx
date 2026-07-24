import React from "react";
import logo from "../assets/assets.jpg";
import facebooklogo from "../assets/facebook.jpg";
import instagramlogo from "../assets/instagram.jpg";
import twitterlogo from "../assets/twitter.jpg";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 px-6 lg:px-44">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">
            BG Remover
          </h2>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm text-center">
          © 2026 BG Remover. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <img
            src={facebooklogo}
            alt="Facebook"
            className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
          />

          <img
            src={instagramlogo}
            alt="Instagram"
            className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
          />

          <img
            src={twitterlogo}
            alt="Twitter"
            className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;