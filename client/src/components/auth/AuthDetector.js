import React from "react";

function AuthDetector({getPasswordStrength, passwordMatch, confPassword, state}) {
    return (
        <>
            <div className="bars" style={{background: !getPasswordStrength ? "transparent" : null}}>
                <div style={{
                    width: getPasswordStrength + "%",
                    background: getPasswordStrength <= 40 ? "red" : getPasswordStrength <= 70 ? "yellow" : "green"
                }}></div>
            </div>
            {!passwordMatch && confPassword ? (
                <div style={{margin: state === "admin" ? "15px 0 0 0" : null}} className="password-match-error">Password
                    and
                    Confirm password do not match</div>) : null}
        </>
    );
}

export default AuthDetector;
