import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Utils from "../Utils";

function PrivateRouteUser(props) {
    const navigate = useNavigate();
    const {children} = props;
    const token = Utils.getToken();
    const client = Utils.getClient()?.role;

    useEffect(() => {
        if (token && client === "admin" || !token && !client) {
            navigate("/discover");
        }
    }, [navigate, token])

    return token && client === "user" ? children : null;
}

export default PrivateRouteUser;
