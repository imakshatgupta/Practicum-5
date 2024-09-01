import React, { useEffect, useState, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGl, { Marker } from 'react-map-gl';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFuaXNoa2gxNiIsImEiOiJjbHRkOWY4Y24wMDh2Mm9xd2xqZ213cDM2In0.OElKVotbRPJFhiGtcVpIlw';

export default function ParkArea() {
  const mapRef = useRef();
  const [viewPort, setViewPort] = useState({
    latitude: 31.5048,
    longitude: 77.1734,
    zoom: 7,
  });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = async () => {
    const accessToken = MAPBOX_TOKEN;
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${accessToken}`;

    try {
      const response = await fetch(geocodingUrl);
      const data = await response.json();
      setSearchResults(data.features);
      if (data.features.length > 0) {
        const newLatitude = data.features[0].center[1];
        const newLongitude = data.features[0].center[0];
        setViewPort({
          ...viewPort,
          latitude: newLatitude,
          longitude: newLongitude,
          zoom: 13.6,
        });
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch();
    }
  }, [searchQuery]);

  const handleSelectPlace = (place) => {
    setSearchQuery(place.place_name);
    setSelectedLocation({
      latitude: place.center[1],
      longitude: place.center[0],
    });
    setIsDropdownOpen(false);
  };

  const handleClick = () => {
    // toast.success('Parking Area Selected');
    navigate('/slot');
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl mb-8 text-center leading-snug font-bold text-black mt-6">
        Select the Area where you want to park
      </h1>

      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="relative mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search location..."
              className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
            />
            <button
              className="bg-cyan-500 text-white p-3 rounded-md hover:bg-cyan-600 transition duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {isDropdownOpen && searchResults.length > 0 && (
            <ul className=" z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectPlace(result)}
                >
                  {result.place_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
          <ReactMapGl
            {...viewPort}
            ref={mapRef}
            mapboxAccessToken={MAPBOX_TOKEN}
            width="100%"
            height="100%"
            transitionDuration="200"
            mapStyle="mapbox://styles/tanishkh16/cltdbi8st002501qzgf8cd4za"
          >
            {selectedLocation && (
              <>
                <Marker
                  onClick={handleClick}
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude + 0.001}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    width="24px"
                    height="24px"
                  >
                    <path d="M12 0C7.245 0 3 4.245 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.755-4.245-9-9-9zm0 13.5c-1.425 0-2.565-1.14-2.565-2.565S10.575 8.37 12 8.37s2.565 1.14 2.565 2.565S13.425 13.5 12 13.5z" />
                  </svg>
                  <div className="text-red-600 font-bold">Parking</div>
                </Marker>
                <Marker
                  onClick={handleClick}
                  latitude={selectedLocation.latitude - 0.004}
                  longitude={selectedLocation.longitude - 0.003}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="red"
                    width="24px"
                    height="24px"
                  >
                    <path d="M12 0C7.245 0 3 4.245 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.755-4.245-9-9-9zm0 13.5c-1.425 0-2.565-1.14-2.565-2.565S10.575 8.37 12 8.37s2.565 1.14 2.565 2.565S13.425 13.5 12 13.5z" />
                  </svg>
                  <div className="text-red-600 font-bold">Parking</div>
                </Marker>
              </>
            )}
          </ReactMapGl>
        </div>
      </div>
    </div>
  );
}
