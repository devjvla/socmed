import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

/* Redux */
import { useSelector, useDispatch } from "react-redux";
import { googleSignIn } from "../store/user.slice";

export default function Signin() {
    const user_info = useSelector(state => state.user.user_info);
    const dispatch  = useDispatch();
    const navigate  = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => dispatch(googleSignIn(response.access_token)),
        onError: (error) => console.log("Login Failed:", error),
    });

    useEffect(() => {
        if(user_info) navigate("/dashboard");
    }, [user_info]);

    return(
        <>
            <p>Project Socmed</p>
            <button onClick={googleLogin}>Sign In with Google</button>
        </>
    );
}