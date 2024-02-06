import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

/* Redux */
import { useSelector } from "react-redux";

/* CSS */
import "../assets/stylesheets/dashboard.css";

/* FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faComment } from '@fortawesome/free-solid-svg-icons'

/* Components */
import Header from "../components/Header";

export default function Dashboard() {
    const user_info = useSelector(state => state.user.user_info);
    let navigate    = useNavigate();

    /* On load */
    useEffect(() => {
        console.log("USER_INFO: ", user_info)
        if(!user_info) navigate("/");
    }, []);

    return (
        <div id="dashboard_container">
            <Header />
            <div id="dashboard_body">
                <h1>Dashboard Page</h1>
                <p>Welcome, {user_info?.first_name} {user_info?.last_name}</p>
            </div>
        </div>
    )
}