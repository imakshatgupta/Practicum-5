import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} className="h-12 w-auto object-contain" alt="Park&Go Logo" />
          </Link>
          <div className="flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <Link to="/myCar" className="text-lg font-bold">
                  <span className="cursor-pointer">
                    Hi,{" "}
                    <span className="text-blue-500">
                      {user && user.userName ? user.userName : "User"}
                    </span>
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-lg cursor-pointer text-gray-700 hover:text-blue-500 transition-colors font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-lg cursor-pointer text-gray-700 hover:text-blue-500 transition-colors font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-lg cursor-pointer text-gray-700 hover:text-blue-500 transition-colors font-bold"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
