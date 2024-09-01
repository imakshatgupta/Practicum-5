import React from "react";
import { Link } from "react-router-dom";
import park from "../assets/park.png";
import logo from "../assets/logo.png";
import Step1 from "../assets/Step1.png";
import Step2 from "../assets/Step2.png";
import Step3 from "../assets/Step3.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import parkGif from "../assets/dribbble_2.gif";
import parkGif2 from "../assets/ANIM_02.gif";
import pk from "../assets/pk.gif";

const Parking = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <Navbar />
      <br className="border" />
      <section
        id="home"
        className="flex flex-col md:flex-row justify-between items-center px-12 py-6 bg-gradient-to-r from-orange-200 to-blue-300"
      >
        <div className="flex flex-col flex-1 text-center md:text-left">
          <div className="mb-10">
            <h1 className="font-poppins font-bold text-5xl md:text-7xl text-gray-800 leading-snug">
              Discover the {" "}
              <br className="sm:hidden" />
              <span className="text-gradient bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
                Ultimate
              </span>{" "}
              Parking Solution
            </h1>
            <Link
              to="/park"
              className="inline-block mt-4 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition duration-300"
            >
              Start Parking
            </Link>
          </div>
          <div>
            <h2 className="font-poppins font-semibold text-3xl leading-snug text-gray-700 mb-4">
              Easy Parking Management
            </h2>
            <p className="text-gray-600 text-lg">
              Our team of experts ensures a seamless parking experience,
              tailored to your needs. We prioritize secure transactions, low
              fees, and user-friendly interfaces, empowering you to find and
              reserve parking spots hassle-free.
            </p>
          </div>
        </div>
        <div className="flex-1 mt-8 md:mt-0">
          <img
            src={park}
            alt="Hero"
            className="w-[90%] mx-auto md:w-[600px] object-contain drop-shadow-xl rounded-lg"
          />
        </div>
      </section>
      <section className="flex justify-center items-center py-12">
        <div className="border shadow-xl rounded-lg overflow-hidden">
          <img src={parkGif} className="h-[300px] p-[20px] object-cover" />
        </div>
      </section>
      <section className="p-8 bg-gray-50">
      <div>
  <div className="flex flex-col items-center mb-12">
    <h2 className="font-poppins font-bold text-4xl text-gray-800 mb-4 leading-snug">
      How It Works
    </h2>
    <p className="text-center text-lg text-gray-600 max-w-xl">
      Discover how our platform simplifies parking. With just a few clicks, you can find, reserve, and park effortlessly.
    </p>
  </div>
  
  <div className="flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12">
    <div className="flex flex-col items-center text-center">
      <div className="p-6 bg-white rounded-full shadow-lg">
        <img src={Step1} alt="Step 1: Search" className="w-16 h-16" />
      </div>
      <p className="text-lg text-gray-700 mt-4">
        <strong>Step 1:</strong> Search for available parking spots near you, including public lots, private garages, and more.
      </p>
    </div>
    
    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 md:w-1 md:h-full"></div>
    
    <div className="flex flex-col items-center text-center">
      <div className="p-6 bg-white rounded-full shadow-lg">
        <img src={Step2} alt="Step 2: Reserve" className="w-16 h-16" />
      </div>
      <p className="text-lg text-gray-700 mt-4">
        <strong>Step 2:</strong> Reserve your spot in advance to ensure a hassle-free experience when you arrive.
      </p>
    </div>
    
    <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 md:w-1 md:h-full"></div>
    
    <div className="flex flex-col items-center text-center">
      <div className="p-6 bg-white rounded-full shadow-lg">
        <img src={Step3} alt="Step 3: Park" className="w-16 h-16" />
      </div>
      <p className="text-lg text-gray-700 mt-4">
        <strong>Step 3:</strong> Park with confidence using our detailed instructions for easy access to your reserved spot.
      </p>
    </div>
  </div>
</div>

      </section>
      <br/>
      <br/>
      <br/>
      <Footer />
    </>
  );
};

export default Parking;
