import React, {useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useDispatch, useSelector} from "react-redux";
import {basketSecret} from "../../redux/actions/payment";
import NavBar from "../../components/main/navigation/NavBar";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutFormBasket from "../../components/payment/CheckoutFormBasket";

const stripePromise = loadStripe("pk_test_51MtrFBJJKYyEd7mo5bVGoIvPNHLugqBT0RZC2133Og8CmVBqEZuNRn9z2jd7jb3Tqf8z454R6v31vUuigD1XAPs600WAV3L64h");

function CardPaymentBasket() {
    const dispatch = useDispatch();
    const basketClientSecret = useSelector((store) => store.payment.basketClietSecret);

    useEffect(() => {
        dispatch(basketSecret());
    }, [dispatch]);

    if (!basketClientSecret) return;

    const options = {
        clientSecret: basketClientSecret
    };

    return (
        <>
            <NavBar/>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutFormBasket/>
            </Elements>
        </>
    );
}

export default CardPaymentBasket;
