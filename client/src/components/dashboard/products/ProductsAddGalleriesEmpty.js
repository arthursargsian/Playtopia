import React from "react";
import _ from "lodash";
import {ReactComponent as Add} from "../../../assets/img/svg/plus.svg";

function ProductsAddGalleriesEmpty({emptyNumbers}) {
    return (
        <>
            {_.range(0, emptyNumbers)?.map((item, index) => (
                <React.Fragment key={index}>
                    {index === emptyNumbers - 1 ? (
                        <label htmlFor="images">
                            <div className="small-img" style={{cursor: index === emptyNumbers - 1 ? "pointer" : null}}>
                                <Add/>
                            </div>
                        </label>
                    ) : (
                        <div className="small-img"></div>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

export default ProductsAddGalleriesEmpty;
