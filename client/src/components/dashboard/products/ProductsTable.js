import React, {useCallback} from "react";
import ReactStars from "react-rating-stars-component";
import Paginate from "../../common/Paginate";
import Loading from "../../common/Loading";
import {ReactComponent as Delete} from "../../../assets/img/svg/delete.svg";
import {ReactComponent as Update} from "../../../assets/img/svg/update.svg";
import Empty from "../../common/Empty";
import TableHeader from "./TableHeader";
import {useDispatch} from "react-redux";
import {deleteProduct} from "../../../redux/actions/products";
import {useNavigate} from "react-router-dom";
import {pathCover} from "../../../Utils";

function ProductsTable({data, status, totalPages}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteProduct = useCallback((id) => {
        dispatch(deleteProduct(id));
    }, [dispatch]);

    return (
        <>
            {status === "success" ? <table className="product-table">
                <thead>
                <TableHeader/>
                <tr>
                    <td colSpan="6">&nbsp;</td>
                </tr>
                </thead>
                <tbody>
                {data?.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <tr className="product-tr">
                            <td className="table-img">
                                <div><img src={pathCover(item.big_img)} alt="no img"/></div>
                            </td>
                            <td className="table-title">
                                <h5>{item.name}</h5>
                            </td>
                            <td className="price">
                                <div><h5>{`$${item.price}`}</h5></div>
                            </td>
                            <td className="price">
                                <div>{item.disc_price ? <h5>{`$${item.disc_price}`}</h5> : null}</div>
                            </td>
                            {window.screen.availWidth >= 869 ? (
                                <td className="stars">
                                    <div><ReactStars size={30} value={item.rating} edit={false}/></div>
                                </td>
                            ) : null}
                            <td className="btns">
                                <div className="update"
                                     onClick={() => navigate(`/admin/products/update-product/${item.id}`)}>
                                    <span><Update/></span>
                                </div>

                            </td>
                            <td className="btns">
                                <div className="delete" onClick={() => handleDeleteProduct(item.id)}>
                                    <span><Delete/></span>
                                </div>
                            </td>
                        </tr>
                        {data.length != index + 1 ? <>
                            <tr>
                                <td colSpan="6">&nbsp;</td>
                            </tr>
                            <tr>
                                <td colSpan="6" className="line"></td>
                            </tr>
                            <tr>
                                <td colSpan="6">&nbsp;</td>
                            </tr>
                        </> : null
                        }
                    </React.Fragment>
                ))}
                </tbody>
            </table> : status === "loading" ? <Loading/> : status === "fail" ? <Empty/> : data?.length === 0 ?
                <Empty/> : null}
            <br/>
            <div className="paginate-footer">
                <Paginate totalPages={totalPages}/>
            </div>
            {totalPages >= 2 ? <><br/><br/></> : null}
        </>
    );
}

export default ProductsTable;
