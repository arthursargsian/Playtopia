import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Utils from "../Utils";

function PrivateRoute({children}) {
    const navigate = useNavigate();
    const token = Utils.getToken();
    const client = Utils.getClient()?.role;

    useEffect(() => {
        if (!token || (client !== "admin" && client !== "user")) {
            navigate("/");
        }
    }, [navigate, token, client]);

    return <>{children}</>;
}

export default PrivateRoute;
