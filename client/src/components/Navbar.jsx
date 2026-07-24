import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import logo from "../assets/assets.jpg";
import creditIcon from "../assets/credit_icon.png";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    token,
    setToken,
    credit,
    setCredit,
    user,
    setUser,
    loadCreditsData,
  } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img className="w-10 sm:w-12" src={logo} alt="Logo" />
        <h2 className="text-xl font-bold">BG-Removal</h2>
      </Link>

      {/* Right Side */}
      {token ? (
        <div className="flex items-center gap-3">

          {/* Credits */}
          <button
            onClick={() => navigate("/buy")}
            className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition"
          >
            <img
              src={creditIcon}
              alt="credit"
              className="w-5"
            />

            <p className="text-sm text-gray-700 font-medium">
              Credits : {credit}
            </p>
          </button>
          <p className="text-gray-600 max-sm:hidden">
            Hi, {user?.name || user?.fullName || "User"}
          </p>

          {/* User */}
          <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer font-semibold">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border">

                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">
                    {user?.name || "User"}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>

                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>

              </div>
            )}
          </div>

        </div>
      ) : (
        <button
          onClick={() => navigate("/signup")}
          className="bg-zinc-800 text-white px-7 py-2 rounded-full hover:bg-black transition"
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default Navbar;