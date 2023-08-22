import React from "react";
import image from "../../assets/img/404.jpg";

function NotFound() {
    return (
        <div className="not-found-wrapper">
            <img className="not-found" src={image} alt="no image" />
        </div>
    );
}

export default NotFound;
