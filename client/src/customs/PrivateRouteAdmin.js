import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Utils from "../Utils";

function PrivateRouteAdmin(props) {
    const navigate = useNavigate();
    const {children} = props;
    const token = Utils.getToken();
    const client = Utils.getClient()?.role;

    useEffect(() => {
        if (!token && client !== "admin") {
            navigate("/");
        }
    }, [navigate, token]);

    return token && client === "admin" ? children : null;
}

export default PrivateRouteAdmin;
