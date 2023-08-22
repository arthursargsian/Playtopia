import React from "react";
import ReactStars from "react-rating-stars-component";
import Empty from "../common/Empty";
import Loading from "../common/Loading";
import {useNavigate} from "react-router-dom";
import {pathCover} from "../../Utils";


function SortProducts({data, status}) {
    const navigate = useNavigate();
    return (
        <>
            {status === "success" ? data?.map((item) => (
                <div key={item.id} className="browse-card" onClick={() => navigate(`/single/${item.id}`)}>
                    <img src={pathCover(item.big_img)} alt=""/>
                    <div className="browse-footer">
                        <h3>{item.name}</h3>
                        <div className="browse-price-card">
                            <h3>{item.disc_price ? `$${item.disc_price}` : `$${item.price}`}</h3>
                            {item.disc_price && <h4>{`$${item.price}`}</h4>}
                        </div>
                        <div className="browse-stars-card">
                            <ReactStars size={30} value={item?.rating} edit={false}/>
                        </div>
                    </div>
                </div>
            )) : status === "fail" ? (
                <Empty/>
            ) : status === "loading" ? (
                <div className="loading-browse">
                    <Loading/>
                </div>
            ) : data?.length === 0 ? (
                <Empty/>
            ) : null}
        </>
    );
}

export default SortProducts;
