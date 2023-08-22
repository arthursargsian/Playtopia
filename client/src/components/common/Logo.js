import React from "react";
import {ReactComponent as LogoPage} from "../../assets/img/svg/logo.svg";
import {useNavigate} from "react-router-dom";

function Logo() {
    const navigate = useNavigate();
    return (
        <>
            <LogoPage onClick={() => navigate("/discover")} className="logo" aria-hidden="true"/>
        </>
    );
}

export default Logo;
