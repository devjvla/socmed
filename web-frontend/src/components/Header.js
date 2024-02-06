import React from "react";

/* Redux */
import { useSelector } from "react-redux";

/* CSS */
import "../assets/stylesheets/header.css";

/* FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const user_info = useSelector(state => state.user.user_info);

    /* FontAwesome Icons */
    const logo = <FontAwesomeIcon icon={faComment} />

    return(
        <div id="header">
            <h3>{logo} Project Socmed</h3>
            <div id="user_container">
                <img src={user_info?.picture_url} />
                <p>{user_info?.first_name} {user_info?.last_name}</p>
            </div>
        </div>
    )
}