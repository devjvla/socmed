import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

/* Redux */
import { useSelector, useDispatch } from "react-redux";
import { googleSignIn } from "../store/user.slice";

/* CSS */
import "../assets/stylesheets/signin.css";

/* FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export default function Signin() {
    const user_info = useSelector(state => state.user.user_info);
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    /* FontAwesome Icons */
    const logo = <FontAwesomeIcon icon={faComment} />

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => dispatch(googleSignIn(response.access_token)),
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if(user_info) navigate("/dashboard");
    }, [user_info]);

    return(
        <div id="signin_container">
            <p>{logo} Project Socmed</p>
            <button id="btn_google" onClick={googleLogin}><img alt="google_icon" src={require("../assets/images/google_icon.png")} /> Sign In with Google</button>
        </div>
    );
}