
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {

    const navigate = useNavigate();

    async function handleLogin(e) {

        e.preventDefault();

        try {
            await axios.get('http://api.run-club.test/sanctum/csrf-cookie',
                {
                    withCredentials: true
                }
            );

            await axios.post('http://api.run-club.test/login',
                {
                    email: e.target.email.value,
                    password: e.target.password.value
                },
                {
                    withCredentials: true,
                    withXSRFToken: true,
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );

            const response = await axios.get('http://api.run-club.test/api/user',
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);

            navigate('/dashboard')

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
            </form>

        </>
    );

}