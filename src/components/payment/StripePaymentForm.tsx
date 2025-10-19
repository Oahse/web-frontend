import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface StripePaymentFormProps {
  orderId: string;
  amount: number;
  currency: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  orderId,
  amount,
  currency,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to make a payment.");
      navigate("/login");
      return;
    }

    const createPaymentIntent = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "/api/v1/payments/create-payment-intent",
          {
            order_id: orderId,
            amount: amount,
            currency: currency,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setClientSecret(response.data.client_secret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast.error("Failed to initialize payment. Please try again.");
        onPaymentError("Failed to initialize payment.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [orderId, amount, currency, isAuthenticated, navigate, onPaymentError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as any,
        billing_details: {
          name: user?.name || "", // Pre-fill with user's name if available
          email: user?.email || "", // Pre-fill with user's email if available
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds, card declined)
      console.error(result.error.message);
      toast.error(result.error.message || "Payment failed.");
      onPaymentError(result.error.message || "Payment failed.");
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        toast.success("Payment successful!");
        onPaymentSuccess(result.paymentIntent.id);
      } else {
        toast.error("Payment not successful. Status: " + result.paymentIntent.status);
        onPaymentError("Payment not successful. Status: " + result.paymentIntent.status);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!clientSecret && loading && (
        <div className="text-center text-primary">Loading payment options...</div>
      )}
      {clientSecret && (
        <div className="border border-gray-300 p-4 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || !clientSecret || loading}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripePaymentForm;
