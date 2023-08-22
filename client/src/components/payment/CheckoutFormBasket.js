import React, {useCallback} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Button from "../common/Button";
import PaymentDescription from "./PaymentDescription";

function CheckoutFormBasket() {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = useCallback(async (ev) => {
        ev.preventDefault();
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/complete-basket",
            },
        });
    }, [stripe, elements]);

    return (
        <>
            <form className="payment-basket" onSubmit={handlePayment}>
                <div className="payment-container">
                    <PaymentDescription/>
                    <div className="basket-payment-container">
                        <PaymentElement/>
                        <Button variant={"buy"} disabled={!stripe || !elements}>Pay</Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default CheckoutFormBasket;
