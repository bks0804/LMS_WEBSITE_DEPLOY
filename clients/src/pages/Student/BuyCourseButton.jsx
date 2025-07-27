import axios from "axios";
import React, { useState } from "react";

const BuyCourseButton = ({ courseId }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to continue.");
        return;
      }

      const response = await axios.post(
        "FRONTEND_SERVER_API/api/payment/checkout/create-checkout-session",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleRazorpayScreen(response.data.data);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const handleRazorpayScreen = async (order) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed to load Razorpay script.");
      return;
    }

    const options = {
      key: "rzp_test_73NLkYXlZbMHP1", // Store key in env file
      amount: order.amount,
      currency: order.currency,
      name: "Braj Coding",
      description: "Payment for Course",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyResponse = await axios.post(
            "FRONTEND_SERVER_API/api/payment/checkout/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (verifyResponse.data.success) {
            alert("Payment Successful!");
            setPaymentStatus("Success");
          } else {
            alert("Payment verification failed!");
            setPaymentStatus("Failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("Error verifying payment!");
          setPaymentStatus("Failed");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: { color: "#54d1f3" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={createRazorpayOrder}
      className="w-full border py-2 rounded-md bg-gray-500"
    >
      Purchase Course
    </button>
  );
};

export default BuyCourseButton;
