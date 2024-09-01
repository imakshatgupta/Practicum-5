import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 p-8">
          <Link
            to="/slotentry"
            className="bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out text-blue-700 font-bold text-2xl py-6 px-8 rounded-lg text-center"
          >
            Slot Entry
          </Link>
          <Link
            to="/slotexit"
            className="bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out text-green-700 font-bold text-2xl py-6 px-8 rounded-lg text-center"
          >
            Slot Exit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
