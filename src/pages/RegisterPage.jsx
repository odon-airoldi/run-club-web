
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {

    const navigate = useNavigate();

    const { checkAuth } = useAuth();

    async function handleRegister(e) {

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
            await axios.post('http://api.run-club.test/register',
                {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    password_confirmation: e.target.password.value
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
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="border" type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="border" type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className="border" type="password" id="password" name="password" />
                </div>
                <div>
                    <label htmlFor="password">Conferma password</label>
                    <input className="border" type="password" id="password_confirmation" name="password_confirmation" />
                </div>
                <div>
                    <button type="submit">Registrati</button>
                </div>
                <div>
                    <div>Sei già membro? <Link to="/login">Accedi</Link></div>
                </div>
            </form>

        </>
    );

}