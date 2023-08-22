import React, {useCallback, useEffect, useState} from "react";
import AuthDetector from "./AuthDetector";
import Button from "../common/Button";
import {getPasswordStrength, showToast} from "../../Utils";
import {useDispatch, useSelector} from "react-redux";
import {signUp} from "../../redux/actions/auth";

function SignUp() {
    const dispatch = useDispatch();
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [authForm, setAuthForm] = useState({firstName: "", lastName: "", email: "", password: "", confPassword: ""});
    const message = useSelector((store) => store.auth.signUpMessage);
    const status = useSelector((store) => store.auth.signUpStatus);

    useEffect(() => {
        setPasswordMatch(authForm.confPassword === authForm.password);
    }, [passwordMatch, authForm]);

    useEffect(() => {
        showToast(status, message);
        if (status === "success") {
            setAuthForm({firstName: "", lastName: "", email: "", password: "", confPassword: ""});
        }
    }, [status, message]);

    const handleChangeForm = useCallback((key, value) => {
        setAuthForm(prevState => ({
            ...prevState, [key]: value,
        }));
    }, [authForm]);

    const handleSubmitForm = useCallback((ev) => {
        ev.preventDefault();
        const passwordStrength = getPasswordStrength(authForm.password);

        if (passwordStrength <= 60) {
            return showToast("fail", "Password is weak. It must have at least 8 characters and contain both lowercase and uppercase letters, as well as digits.");
        } else if (passwordStrength <= 69) {
            return showToast("fail", "Password is moderately strong. It can be improved by adding more characters and a mix of uppercase letters, lowercase letters, and digits.");
        } else if (passwordStrength >= 70 && passwordStrength <= 100) {
            dispatch(signUp(authForm));
        }
    }, [dispatch, authForm]);

    return (<>
        <form className="auth-form-block" onSubmit={(ev) => handleSubmitForm(ev)}>
            <div className="auth-box">
                <input onChange={(ev) => handleChangeForm("firstName", ev.target.value)} className="auth-input"
                       value={authForm.firstName} name="firstName" required id="firstName" type="text"/>
                <label htmlFor="firstName">First name</label>
            </div>
            <div className="auth-box">
                <input onChange={(ev) => handleChangeForm("lastName", ev.target.value)} className="auth-input"
                       value={authForm.lastName} name="lastName" required id="lastName" type="text"/>
                <label htmlFor="lastName">Last name</label>
            </div>
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
            <div className="auth-box">
                <input className="auth-input" name="confirmPassword" required id="confirmPassword" type="password"
                       value={authForm.confPassword}
                       onChange={(ev) => handleChangeForm("confPassword", ev.target.value)}/>
                <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <AuthDetector getPasswordStrength={getPasswordStrength(authForm.password)}
                          confPassword={authForm.confPassword} passwordMatch={passwordMatch}/>
            <Button variant={"auth-btn"}>Sign Up</Button>
        </form>
    </>);
}

export default SignUp;
