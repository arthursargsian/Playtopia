import React, {useEffect} from "react";
import NavBar from "../../components/main/navigation/NavBar";
import ItemsList from "../../components/payment/ItemsList";
import BasketCardDelivery from "../../components/payment/BasketCardDelivery";
import Paginate from "../../components/common/Paginate";
import {useDispatch, useSelector} from "react-redux";
import {getBasket} from "../../redux/actions/payment";

function Basket() {
    const dispatch = useDispatch();
    const page = useSelector((store) => store.rest.page);

    const basketListData = useSelector((store) => store.payment.basketListData);
    const basketPage = useSelector((store) => store.payment.basketPage);
    const basketTotalPrice = useSelector((store) => store.payment.basketTotalPrice);
    const basketListStatus = useSelector((store) => store.payment.basketListStatus);

    useEffect(() => {
        dispatch(getBasket(page));
    }, []);

    return (
        <div className="wrapper">
            <NavBar/>
            <div className="container">
                <div className="basket-block">
                    <ItemsList status={basketListStatus} data={basketListData}/>
                    <BasketCardDelivery totalPrice={basketTotalPrice}/>
                </div>
                <div className="basket-paginate">
                    <Paginate totalPages={basketPage}/>
                </div>
            </div>
        </div>
    );
}

export default Basket;
