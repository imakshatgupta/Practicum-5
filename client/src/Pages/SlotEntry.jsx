import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SlotEntry = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const redirect = async () => {
    toast.success("Slot Entry Successful");
    navigate("/admin");
    window.location.reload();
  };

  const add = async () => {
    const response = await fetch("http://localhost:8000/parking/addSlot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const qrData = async (text) => {
    try {
      const slotBooking = JSON.parse(text);
      const slotEntry = await fetch("http://localhost:8000/parking/slotEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slotId: slotBooking.slotId,
          carOwner: user._id,
        }),
      });
      const data = await slotEntry.json();
      console.log(data);
      await redirect();
    } catch (error) {
      console.error("Error processing QR data:", error);
      toast.error("Failed to process QR data. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Scan QR Code to Enter Slot
        </h2>
        <Scanner
          components={{
            audio: false,
            video: false,
          }}
          options={{
            delayBetweenScanAttempts: 1000,
            delayBetweenScanSuccess: 10000,
          }}
          onResult={(text) => qrData(text)}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  );
};

export default SlotEntry;
