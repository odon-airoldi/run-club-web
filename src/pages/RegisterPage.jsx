
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";


export default function RegisterPage() {

    const navigate = useNavigate();

    const { checkAuth } = useAuth();

    async function handleRegister(e) {

        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', e.target.first_name.value);
        formData.append('last_name', e.target.last_name.value);
        formData.append('email', e.target.email.value);
        formData.append('password', e.target.password.value);
        formData.append('password_confirmation', e.target.password_confirmation.value);

        const picture = e.target.picture.files[0];

        if (picture) {
            formData.append('picture', picture);
        }


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
                formData,
                {
                    // includi cookie di sessione autenticato
                    withCredentials: true,
                    // axios legge il cookie XSRF-TOKEN e lo aggiunge alla richiesta, necessario per le rotte POST/PUT/PATCH/DELETE
                    withXSRFToken: true,
                    // comunico al backend che mi aspetto una risposta JSON
                    headers: {
                        'Content-Type': 'multipart/form-data'
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
        <div className="">
            <div className="sm:w-128 mx-auto">

                <h1 className="text-4xl text-center font-semibold font-zalando mb-4">Registrati</h1>

                <form onSubmit={handleRegister} className="space-y-6">
                    <AppInput type="text" id="first_name" name="first_name" label="Nome" required />
                    <AppInput type="text" id="last_name" name="last_name" label="Cognome" required />
                    <AppInput type="email" id="email" name="email" label="Email" required />
                    <AppInput type="file" id="picture" name="picture" label="Immagine del profilo" />
                    <AppInput type="password" id="password" name="password" label="Password" required />
                    <AppInput type="password" id="password_confirmation" name="password_confirmation" label="Conferma Password" required />
                    <AppButton type="submit" className="w-full">Registrati</AppButton>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Sei già membro? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Accedi</Link>
                </p>

            </div>

        </div>
    );

}