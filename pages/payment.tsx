"use client";
import Payment from "@components/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";

const payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const response = await fetch("/api/payment", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // Process the response data here
        setStripeApiKey(data.stripeApiKey);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);
  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      )}
    </>
  );
};

export default payment;
