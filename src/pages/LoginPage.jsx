
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();

    const { checkAuth } = useAuth();

    async function handleLogin(e) {

        e.preventDefault();

        try {
            // richiesta a laravel sanctum di genereare un cookie (token CSRF) XSRF-TOKEN e uno di sessione in anonimo
            await axios.get('http://api.run-club.test/sanctum/csrf-cookie',
                {
                    // includi cookie( XSRF-TOKEN, laravel-session) mandati dal server come risposta e salva nel browser
                    withCredentials: true
                }
            );
            // invio credenziali al backend, se corrette laravel autentica l'utente e rigenere il cookie di sessione in autenticato
            await axios.post('http://api.run-club.test/login',
                {
                    email: e.target.email.value,
                    password: e.target.password.value
                },
                {
                    // includi cookie di sessione autenticato
                    withCredentials: true,
                    // axios legge il cookie XSRF-TOKEN e lo aggiunge alla richiesta, necessario per le rotte POST/PUT/PATCH/DELETE
                    withXSRFToken: true,
                    // comunico al backend che mi aspetto una risposta JSON
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );
            // utilizzo la funzione offerta dal context per la verifica dell'autenticazione e salvataggio dei dati user nello state
            await checkAuth();

            navigate('/')

        } catch (error) {

            console.log(error.response);

        }

    }

    return (
        <>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="border" type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className="border" type="password" id="password" name="password" />
                </div>
                <div>
                    <button type="submit">Accedi</button>
                </div>
                <div>
                    <Link to="/register">Crea un nuovo accout</Link>
                </div>
            </form>

        </>
    );

}