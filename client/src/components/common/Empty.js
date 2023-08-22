import React from "react";
import empty from "../../assets/img/empty.webp";

function Empty() {
    return (
        <div className="empty-container">
            <img src={empty} alt="not found"/>
        </div>
    );
}

export default Empty;
