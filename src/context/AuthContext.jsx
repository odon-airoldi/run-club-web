import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        async function isAuth() {
            try {
                const response = await axios.get('http://api.run-club.test/api/user',
                    {
                        withCredentials: true
                    }
                )
                setUser(response.data);
            } catch {
                setUser(null)
            } finally {

            }


        }

        isAuth();

    }, []);

    return (
        <AuthContext.Provider

            value={{
                user,
                setUser
            }}

        >

            {children}

        </AuthContext.Provider>
    )

}

function useAuth() {

    const context = useContext(AuthContext);
    return context;

}

export { AuthProvider, useAuth }