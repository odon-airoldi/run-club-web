import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// creazione context
const AuthContext = createContext();

// provider per offrire i dati ai componenti figli
function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkAuth() {
        try {
            // richiesta se la sessione è autenticata ricevo come risposta i dati user loggato
            const response = await axios.get('http://api.run-club.test/api/user',
                {
                    // includi cookie di sessione autenticato
                    withCredentials: true
                }
            )
            // se autenticato salvo dati nello state
            setUser(response.data);
        } catch {
            // se non c'è sessione valida setto in null
            setUser(null)
        } finally {
            // in ogni caso setto che il caricamente è finito
            setLoading(false)
        }
    }

    // eseguo la funzione al mount una volta
    useEffect(() => {
        checkAuth();
    }, []);

    return (

        // il provider offre ai componenti figli i valori che gli passo
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                checkAuth
            }}
        >

            {children}

        </AuthContext.Provider>
    )

}

// custom hook per l'utilizzo del context, invece di scrivere useContext(AuthContext) scrivo useAuth()
function useAuth() {

    const context = useContext(AuthContext);
    return context;

}

export { AuthProvider, useAuth }