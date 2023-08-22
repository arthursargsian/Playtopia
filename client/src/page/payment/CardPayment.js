import React, {useEffect} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {useParams} from "react-router-dom";
import NavBar from "../../components/main/navigation/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {getClientSecret} from "../../redux/actions/payment";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/payment/CheckoutForm";

const stripePromise = loadStripe('pk_test_51MtrFBJJKYyEd7mo5bVGoIvPNHLugqBT0RZC2133Og8CmVBqEZuNRn9z2jd7jb3Tqf8z454R6v31vUuigD1XAPs600WAV3L64h');

function CardPayment() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const clientSecret = useSelector((store) => store.payment?.clientSecret);

    useEffect(() => {
       if (id) dispatch(getClientSecret(id));
    }, [dispatch, id]);

    if (!clientSecret) return;

    const options = {
        clientSecret
    };

    return (
        <>
            <NavBar/>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm/>
            </Elements>
        </>
    );
}

export default CardPayment;
