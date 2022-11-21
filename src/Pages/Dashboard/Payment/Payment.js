import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {

    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;



    return (
        <div>
            <h2 className="text-xl">Payment for {treatment}</h2>
            <p className="text-xl">Please Pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;