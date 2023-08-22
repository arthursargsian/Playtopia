import React from "react";
import {Helmet} from "react-helmet";
import {NavLink} from "react-router-dom";
import ClientMenu from "../ClientMenu";

function NavigationModal({state}) {
    return (
        <>
            {state && (
                <Helmet>
                    <style>{`body { overflow-y: hidden; }`}</style>
                </Helmet>
            )}
            <nav className="navigation-modal">
                <ul className="menu-block burger-block">
                    <li className="menu-list"><NavLink to={"/discover"}>Discover</NavLink></li>
                    <li className="menu-list"><NavLink to={"/browse"}>Browse</NavLink></li>
                </ul>
                <ClientMenu/>
            </nav>
        </>
    );
}

export default NavigationModal;
