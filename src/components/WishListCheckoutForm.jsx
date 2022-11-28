import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";
import SmallSpinner from "./SmallSpinner";

const WishListCheckoutForm = ({ closeModal, order, refetch }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch(
      `https://best-buy-server.vercel.app/create-payment-intent?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("Best-buy-token")}`,
        },
        body: JSON.stringify({ price: order.resalePrice }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [order, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
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
            name: order.productName,
            email: order.customerEmail,
          },
        },
      });

    if (intentError) {
      setError(intentError);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        price: order.resalePrice,
        customerName: user?.displayName,
        sellerEmail: order.sellerEmail,
        customerEmail: order.customerEmail,
        transactionId: paymentIntent.id,
        productId: order._id,
        productName: order.name,
      };

      fetch(`https://best-buy-server.vercel.app/wishListPayment`, {
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
    <div>
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
    </div>
  );
};

export default WishListCheckoutForm;
