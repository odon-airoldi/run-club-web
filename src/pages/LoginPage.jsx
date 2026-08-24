
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AppButton from "../components/AppButtton";
import AppInput from "../components/AppInput";

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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Accedi</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <AppInput type="email" id="email" name="email" label="Email" />
                    </div>
                    <div>
                        <AppInput type="password" id="password" name="password" label="Password" />
                    </div>
                    <div>
                        <AppButton type="submit">Accedi</AppButton>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Non sei membro? <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Registrati gratis</Link>
                </p>
            </div>
        </div>
    );

}