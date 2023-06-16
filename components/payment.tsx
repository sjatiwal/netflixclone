"use client";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { StripeCardNumberElement, StripeCardElement } from "@stripe/stripe-js";
import { useDispatch } from "react-redux";
import { createSubscription } from "@action/payment";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducers";
import { useRouter } from "next/router";
// import { useRef } from "react";
interface Payment {
  payment_Info: {};
}
function Payment() {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();
  const { payment_Info } = useSelector(
    (state: RootState) => state.payments.payment
  );

  const [subscription, setSubscription] = useState(false);
  useEffect(() => {
    payment_Info && payment_Info["status"] === "succeeded"
      ? setSubscription(true)
      : setSubscription(false);
    localStorage.setItem("subscription", subscription.toString());
  }, [payment_Info, subscription]);

  // const payBtn = useRef(null);
  const amount = JSON.parse(sessionStorage.getItem("payment") as string);
  const amountRupee = amount * 100;

  const payment: Payment = { payment_Info: {} };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amountRupee }),
      credentials: "same-origin",
    });

    const data = await response.json();

    const client_secret = data.client_secret;

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement) as
          | StripeCardNumberElement
          | StripeCardElement,
      },
    });

    if (result.error) {
      alert("Error");
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment Completed");
        payment.payment_Info = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          subscription: amount,
        };
        dispatch(createSubscription(payment));
        router.push("/");
      } else {
        alert("Payment is not completed due to some reason");
      }
    }
  };
  return (
    <>
      <div className="bg-red-600 h-screen  grid grid-cols-1  place-items-center relative">
        <form
          className="bg-black h-96 w-72 p-4 space-y-10"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="text-center text-red-600 underline underline-offset-8">
            Card Info
          </div>
          <div>
            <CardNumberElement className="border-2 border-red-600 h-8 px-4 py-1 !text-red-600 bg-slate-100" />
          </div>
          <div>
            <CardExpiryElement className="border-2 border-red-600 h-8 px-4 py-1 text-red-600 bg-slate-100" />
          </div>
          <div>
            <CardCvcElement className="border-2 border-red-600 h-8 px-4 py-1 text-red-600 bg-slate-100" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${amount}`}
            // ref={payBtn}
            className="bg-red-600 w-64 h-8"
          />
        </form>
      </div>
    </>
  );
}

export default Payment;
