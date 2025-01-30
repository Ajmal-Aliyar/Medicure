import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { api } from '../../../utils/axiosInstance';
import { createCheckoutSessionApi } from '../../../sevices/payment/payment';

// Make sure to import your public key from Stripe
const stripePromise = loadStripe('your_stripe_public_key_here');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call backend to create checkout session
      const response = await createCheckoutSessionApi({

        doctorName: 'Dr. Smith',
        specialization: 'Dermatology',
        startTime: '10:00 AM',
        endTime: '10:30 AM',
        duration: '30',
        fees: 1500,
      })

      const sessionUrl = response.sessionUrl;
      window.location.href = sessionUrl;
    } catch (error) {
      setError('An error occurred while creating the payment session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Complete Your Payment</h2>
      <CardElement />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='w-[500px]'>
        <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
      </div>
      
    </div>
    
  );
};

export default Checkout;
