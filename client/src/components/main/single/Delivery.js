import React, {useCallback} from "react";
import Button from "../../common/Button";
import {useNavigate, useParams} from "react-router-dom";

function Delivery() {
    const {id} = useParams();
    const navigate = useNavigate();

    const handleBuy = useCallback(() => {
        navigate(`/card/${id}`);
    }, [navigate, id]);

    return (
        <div className="single-container">
            <div className="delivery-buy">
                <Button onClick={handleBuy} variant={"buy"}>Buy</Button>
            </div>
        </div>
    );
}

export default Delivery;
