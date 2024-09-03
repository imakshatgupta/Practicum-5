import React, { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "@mui/material";

const SlotExit = () => {
  const navigate = useNavigate();
  const [payableAmount, setPayableAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_XDJyRLoZSTmLWa",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderDetails.razorpayOrderId,
      handler: async (response) => {
        try {
          const verifyUrl = `http://localhost:8000/listings/verify`;

          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          await axios.post(verifyUrl, verifyData);
          navigate("/admin");
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleProceed = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/listings/bookings/addBooking",
        {
          rentPrice: data,
        }
      );
      initPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const qrData = async (text) => {
    const slotBooking = JSON.parse(text);
    const slotExit = await fetch("http://localhost:8000/parking/slotExit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: slotBooking.slotId,
      }),
    });
    const data = await slotExit.json();
    setPayableAmount(data.payableAmount);
    setShowModal(true);
  };

  const handlePayWithRazorpay = async () => {
    setShowModal(false);
    await handleProceed(payableAmount);
  };

  const handlePayWithWallet = async () => {
    setShowModal(false);
    const cryptoAmount = payableAmount * 0.011;
    const cryptoAddress = "0xC3385be7163DA9ee64dfE1847De5dC9c8Aa88eC0";
    await makeCryptoPayment(cryptoAddress, cryptoAmount);
    navigate("/admin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <Scanner
          components={{
            audio: false,
          }}
          options={{
            delayBetweenScanSuccess: 10000,
          }}
          onResult={(text) => qrData(text)}
          onError={(error) => console.log(error?.message)}
        />
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Payable Amount: Rs. {payableAmount}
            </h2>
            <div className="flex justify-center mt-4 ">
              <button
                onClick={handlePayWithRazorpay}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SlotExit;
