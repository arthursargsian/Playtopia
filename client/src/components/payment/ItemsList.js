import React from "react";
import {pathCover} from "../../Utils";
import {useNavigate} from "react-router-dom";
import Loading from "../common/Loading";

function ItemsList({status, data}) {
    const navigate = useNavigate();

    return (
        <>
            <div className={`items-container ${data.length === 0 ? "status-empty" : null}`}>
                {data.length >= 1 ? status === "success" ? data.map((item) => (
                    <div key={item.product.id} className={`items-block`}
                         onClick={() => navigate(`/single/${item.product.id}`)}>
                        <div className="items-main">
                            <figure className="items-img">
                                <img
                                    src={pathCover(item.product.big_img)}
                                    alt=""/>
                            </figure>
                            <div className="items-info">
                                <h3 className="items-title">{item.product.name}</h3>
                                <p className="items-desc">{item.product.desc.slice(0, 200)}</p>
                            </div>
                        </div>
                        <div className="item-delivery">
                            <h2 className="item-price">{`$${item.product.disc_price ? item.product.disc_price : item.product.price}`}</h2>
                            <h2 className="item-discprice">{item.product.disc_price ? "$" + item.product.price : null}</h2>
                        </div>
                    </div>
                )) : status === "loading" ? <Loading/> : null : <h2>Basket is empty</h2>}
            </div>
        </>
    );
}

export default ItemsList;
