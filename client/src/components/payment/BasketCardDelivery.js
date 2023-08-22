import React from 'react';
import Button from "../common/Button";
import {useNavigate} from "react-router-dom";

function BasketCardDelivery({totalPrice}) {
    const navigate = useNavigate();

    return (
        <>
            <div className="card-price">
                <div className="prices">
                    <h2>Total Price</h2>
                    <h2>${totalPrice}</h2>
                </div>
                <div>
                    <Button onClick={() => navigate("/card-basket")} variant={"buy total-price"}>Buy</Button>
                </div>
            </div>
        </>
    );
}

export default BasketCardDelivery;
