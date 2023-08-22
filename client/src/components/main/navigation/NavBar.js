import React, {useEffect, useState} from "react";
import {ReactComponent as Logo} from "../../../assets/img/svg/logo.svg";
import {ReactComponent as Bars} from "../../../assets/img/svg/bars.svg";
import {NavLink, useNavigate} from "react-router-dom";
import ClientMenu from "../ClientMenu";
import NavigationModal from "./NavigationModal";
import {useSelector} from "react-redux";

function NavBar() {
    const navigate = useNavigate();
    const [screenState, setScreenState] = useState(false);
    const [toggleBar, setToggleBar] = useState(false);
    const profile = useSelector((store) => store.rest.profile);

    useEffect(() => {
        if (window.screen.availWidth <= 800) setScreenState(true);
    }, []);

    return (
        <>
            <header className="header" id="header">
                <div className="container">
                    <nav className="menu">
                        <div className={`main-menu ${screenState ? "burger-menu" : null}`}>
                            <div className="logo-box" style={{zIndex: profile ? -99: 999}} onClick={() => navigate("/discover")}>
                                <Logo/>
                            </div>
                            {screenState ? <Bars style={{zIndex: profile ? -99: 999}} onClick={() => setToggleBar(!toggleBar)} className="bars-menu"/> :
                                <ul className="menu-block">
                                    <li className="menu-list"><NavLink to={"/discover"}>Discover</NavLink></li>
                                    <li className="menu-list"><NavLink to={"/browse"}>Browse</NavLink></li>
                                </ul>}
                        </div>
                        {screenState ? null : <ClientMenu/>}
                    </nav>
                </div>
                {toggleBar ? <NavigationModal state={toggleBar}/> : null}
            </header>
        </>
    );
}

export default NavBar;
