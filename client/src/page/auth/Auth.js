import React, {useState} from "react";
import SignUp from "../../components/auth/SignUp";
import wallpaper from "../../assets/img/auth.jpg";
import SignIn from "../../components/auth/SignIn";

function Auth() {
    const [authState, setAuthState] = useState(true);

    return (
        <>
            <div className="wrapper">
                <main className="main-auth">
                    <div className="auth-wallpaper">
                        <img src={wallpaper} alt="wallpaper"/>
                    </div>
                    <div className="auth-form">
                        <span><span style={{color: !authState ? "#fff" : null}}>Sign Up</span> / <span style={{color: authState ? "#fff" : null}}>Sign In</span></span>
                        {authState ? <SignIn/> : <SignUp/>}
                        <h5 onClick={() => setAuthState(!authState)} className="auth-state">{authState ?
                            "Don’t have an Playtopia account? Sign Up" :
                            "Already have an Playtopia account? Sign In"}
                        </h5>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Auth;
