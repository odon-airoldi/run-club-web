
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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Accedi</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                        <div className="mt-2">
                            <input id="email" type="email" name="email" required autoCompletete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div> */}
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" required autoCompletete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Accedi</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Non sei membro? <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Registrati gratis</Link>
                </p>
            </div>
        </div>
    );

}