import React, {useCallback, useEffect, useState} from "react";
import Button from "../common/Button";
import Utils, {getPasswordStrength, showToast} from "../../Utils";
import {signIn} from "../../redux/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authForm, setAuthForm] = useState({email: "", password: ""});
    const message = useSelector((store) => store.auth.signInMessage);
    const status = useSelector((store) => store.auth.signInStatus);

    useEffect(() => {
        if (status === "success") {
            setAuthForm({email: "", password: ""});
        } else {
            showToast(status, message);
        }
    }, [status, message]);

    const handleChangeForm = useCallback((key, value) => {
        setAuthForm(prevState => ({
            ...prevState, [key]: value,
        }));
    }, [authForm]);

    const handleSubmitForm = useCallback(async (ev) => {
        ev.preventDefault();
        if (authForm.email && authForm.password) await dispatch(signIn(authForm));
        if (Utils.getToken() && Utils.getClient().role === "admin") await navigate("/discover");
    }, [dispatch, authForm]);

    return (
        <>
            <form className="auth-form-block sign-in" onSubmit={(ev) => handleSubmitForm(ev)}>
                <div className="auth-box">
                    <input onChange={(ev) => handleChangeForm("email", ev.target.value)} className="auth-input"
                           value={authForm.email} name="email" required id="email" type="text"/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="auth-box">
                    <input onChange={(ev) => handleChangeForm("password", ev.target.value)} className="auth-input"
                           value={authForm.password} name="password" required id="password" type="password"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <Button variant={"auth-btn"}>Sign In</Button>
            </form>
        </>
    );
}

export default SignIn;
