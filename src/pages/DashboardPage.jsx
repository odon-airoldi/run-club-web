
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user, loading, logoutAuth } = useAuth();


    return (
        <>
            <h1>Dashboard</h1>

            {loading && 'Sto caricandoooooooooooooo'}
            <p>ciao {user && user.name}</p>

            <div>

            </div>

            <button onClick={logoutAuth}>Logout</button>

        </>
    );


}