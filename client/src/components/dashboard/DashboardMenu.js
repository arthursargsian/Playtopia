import React, {useCallback, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Logo from "../common/Logo";
import Client from "../common/Client";
import {ReactComponent as Categories} from "../../assets/img/svg/categories.svg";
import {ReactComponent as Games} from "../../assets/img/svg/games.svg";
import {ReactComponent as Admins} from "../../assets/img/svg/noun-admin-3324336.svg";
import {ReactComponent as Users} from "../../assets/img/svg/user-list.svg";
import {ReactComponent as Bars} from "../../assets/img/svg/bars.svg";
import {useDispatch} from "react-redux";
import {barsState} from "../../redux/actions/rest";


function DashboardMenu() {
    const dispatch = useDispatch();
    const [bars, setBars] = useState(true);

    useEffect(() => {
        dispatch(barsState(bars));
    }, [bars]);

    const handleCloseBar = useCallback(() => {
        dispatch(barsState(false));
    }, [dispatch]);

    return (
        <>
            <div className="dashboard-menu">
                <div className="burger"><Bars onClick={() => setBars(false)}/></div>
                <div className="logo-block">
                    <Logo/>
                </div>
                <br/>
                <div className="client-block">
                    <Client/>
                </div>
                <br/>
                <nav className="navigation-dshboard">
                    <ul className="nav-block">
                        <li onClick={handleCloseBar} className="nav-list"><NavLink
                            to="/admin/categories"><span><Categories/>Categories</span></NavLink></li>
                        <li onClick={handleCloseBar} className="nav-list"><NavLink
                            to="/admin/administration"><span><Admins/>Administration</span></NavLink></li>
                        <li onClick={handleCloseBar} className="nav-list"><NavLink
                            to="/admin/products"><span><Games/>Products</span></NavLink>
                        </li>
                        <li onClick={handleCloseBar} className="nav-list"><NavLink
                            to="/admin/users"><span><Users/>Users</span></NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default DashboardMenu;
