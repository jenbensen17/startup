import React from "react";
import { useNavigate } from 'react-router-dom';

import './authenticated.css'

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        fetch(`api/auth/logout`, {
            method: 'delete',
        })
        .catch(() => {
            //logout failed
        })
        .finally(() => {
            localStorage.removeItem('userName');
            props.onLogout();
        })
    }

    return (
        <div>
        <div className='playerName'>User: {props.userName}</div>
        <button onClick={() => navigate(`dashboard/${props.userName}`)}>
            Dashboard
        </button>
        <button onClick={() => logout()}>
            Logout
        </button>
        </div>
    )
}