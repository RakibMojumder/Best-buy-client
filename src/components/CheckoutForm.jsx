import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SmallSpinner from "./SmallSpinner";

const CheckoutForm = ({ bookedOrder, refetch, closeModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
      },
      body: JSON.stringify({ price: bookedOrder.productPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [bookedOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error);
    } else {
      setError("");
    }

    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: bookedOrder.productName,
            email: bookedOrder.customerEmail,
          },
        },
      });

    if (intentError) {
      setError(intentError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price: bookedOrder.productPrice,
        customerName: bookedOrder.customerName,
        sellerEmail: bookedOrder.sellerEmail,
        customerEmail: bookedOrder.customerEmail,
        transactionId: paymentIntent.id,
        bookingId: bookedOrder._id,
        productId: bookedOrder.productId,
      };

      fetch(`http://localhost:5000/payment`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Payment successful");
          refetch();
          closeModal();
          setProcessing(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-[#3749BB] px-10 rounded-lg py-1 text-white mt-5"
        type="submit"
        disabled={!stripe || processing}
      >
        {processing ? <SmallSpinner /> : "Pay"}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default CheckoutForm;
