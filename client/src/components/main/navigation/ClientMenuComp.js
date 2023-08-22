import React, {useCallback, useState} from "react";
import {ReactComponent as Favorite} from "../../../assets/img/svg/favorite.svg";
import {ReactComponent as User} from "../../../assets/img/svg/user.svg";
import {ReactComponent as Basket} from "../../../assets/img/svg/basket.svg";
import {ReactComponent as Dashboard} from "../../../assets/img/svg/dhaboard.svg";
import Utils from "../../../Utils";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {stateProfile} from "../../../redux/actions/rest";

function ClientMenuComp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathname} = useLocation();

    const token = Utils.getToken();
    const user = Utils.getClient()?.role === "user" ? Utils.getClient()?.role : null;
    const admin = Utils.getClient()?.role === "admin" ? Utils.getClient()?.role : null;
    const profile = useSelector((store) => store.rest.profile);

    const handleRoute = useCallback((path) => {
        if (path === "user" && !token) navigate("/");
        if (path === "dashboard" && token && admin) navigate("/admin/products");
        if (path === "user" && token) dispatch(stateProfile(!profile));
    }, [token, profile]);

    const handleRedirect = useCallback((path) => {
        if (path === "basket") {
            navigate("/basket");
        }
        if (path === "favorite") {
            navigate("/favorite");
        }
    }, [navigate]);

    return (
        <>
            <nav className="client-menu">
                {token ? <>
                    <Basket onClick={() => handleRedirect("basket")}
                            className={`basket-svg ${pathname === "/basket" ? "active-svg" : null}`} title="Basket"/>
                    <Favorite onClick={() => handleRedirect("favorite")}
                              className={`favorite-svg ${pathname === "/favorite" ? "active-svg" : null}`}
                              title="Favorite"/></> : null}
                {token && admin ? <Dashboard onClick={() => handleRoute("dashboard")} className="dashboard-svg"
                                             title="dashboard"/> : null}
                <User className="user-svg" onClick={() => handleRoute("user")} title="Profile"/>
            </nav>
        </>
    );
}

export default ClientMenuComp;
