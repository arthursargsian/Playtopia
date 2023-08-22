import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Utils from "../Utils";

function PublicRoute(props) {
    const navigate = useNavigate();
    const {children} = props;
    const token = Utils.getToken();
    const client = Utils.getClient()?.role;

    useEffect(() => {
        if (token && client === "admin") {
            navigate("/admin/products");
        } else if (token && client === "user") {
            navigate("/discover");
        }
    }, [navigate, token])

    return !token && !client ? children : null;
}

export default PublicRoute;
