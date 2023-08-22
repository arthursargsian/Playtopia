import React from "react";

function ProductsParams({params}) {
    return (
        <div className="params">
            <p className="title">About this game</p>
            <div className="gradient-line"></div>
            <p className="text">{params?.desc}</p>
            <p className="title">System Requirements</p>
            <div className="gradient-line"></div>
            <ul className="params-block">
                <li className="params-list"><p><span>Processor:</span> {params?.processor}</p></li>
                <li className="params-list"><p><span>Memory:</span> {params?.ram}</p></li>
                <li className="params-list"><p><span>Graphics:</span>{params?.videocard}</p></li>
                <li className="params-list"><p><span>Storage:</span>{params?.disk_space}</p></li>
            </ul>
        </div>
    );
}

export default ProductsParams;
