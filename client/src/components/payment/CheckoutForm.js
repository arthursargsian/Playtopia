import React, {useCallback, useEffect, useState} from "react";
import {PaymentElement, useElements, useStripe, CardElement} from "@stripe/react-stripe-js";
import Button from "../common/Button";
import {pathCover} from "../../Utils";
import ReactStars from "react-rating-stars-component";
import {single} from "../../redux/actions/single";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Loading from "../common/Loading";
import PaymentDescription from "./PaymentDescription";

function CheckoutForm() {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const {id} = useParams();

    const product = useSelector((store) => store.single.singleData?.product);
    const singleStatus = useSelector((store) => store.single.singleStatus);

    useEffect(() => {
        dispatch(single(id));
    }, [dispatch, id]);

    const handlePayment = useCallback(async (ev) => {
        ev.preventDefault();
        if (!stripe || !elements) return;

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/complete",
            },
        });
    }, [stripe, elements]);

    return (
        <>
            <div className="wrapper">
                <div className="container">
                   <div className="payment-container">
                       <PaymentDescription/>
                       <div className="shoping-container">
                           {singleStatus === "success" ? <div className="browse-card">
                               <img src={pathCover(product.big_img)} alt=""/>
                               <div className="browse-footer">
                                   <h3>{product.name}</h3>
                                   <div className="browse-price-card">
                                       <h3>{product.disc_price ? `$${product.disc_price}` : `$${product.price}`}</h3>
                                       {product.disc_price && <h4>{`$${product.price}`}</h4>}
                                   </div>
                                   <div className="browse-stars-card">
                                       <ReactStars size={30} value={product?.rating} edit={false}/>
                                   </div>
                               </div>
                           </div> : <Loading/>}
                           <div className="payment-block">
                               <form onSubmit={(ev) => handlePayment(ev)}>
                                   <PaymentElement/>
                                   <Button disabled={!stripe || !elements} variant={"buy pay"}>Pay</Button>
                               </form>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutForm;
