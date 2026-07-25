
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    async function handleLogout() {

        // e.preventDefault();

        try {

            await axios.post('http://api.run-club.test/logout',
                {
                    // data non necessari
                },
                {
                    // necessario, laravel deve ricevre cookie di sessione da invalidare
                    withCredentials: true,
                    // logout è POST, quindi richiede token CSRF valido come login
                    withXSRFToken: true,
                }
            );

            console.log(user);

            navigate('/login');

        } catch (error) {

            console.log('error');
            console.log(error.response);

        }

    }


    return (
        <>
            <h1>Dashboard</h1>

            <p>ciao {user && user.name}</p>

            <button onClick={handleLogout}>Logout</button>

        </>
    );


}