import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

/* Redux */
import { useSelector } from "react-redux";

export default function Dashboard() {
    const user_info = useSelector(state => state.user.user_info);
    let navigate    = useNavigate();

    /* On load */
    useEffect(() => {
        console.log("USER_INFO: ", user_info)
        if(!user_info) navigate("/");
    }, []);

    return (
        <>
            <h1>Dashboard Page</h1>
            <p>Welcome, {user_info?.first_name} {user_info?.last_name}</p>
        </>
    )
}