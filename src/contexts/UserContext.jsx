import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// creazione context
const UserContext = createContext();

// provider per offrire i dati ai componenti figli
function UserProvider({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [workouts, setWorkouts] = useState(null);
    const [runsWorkouts, setRunsWorkouts] = useState(null);

    // user
    async function showUser(id) {
        try {
            const response = await axios.get(`http://api.run-club.test/api/users/${id}`,
                {
                    withCredentials: true
                }
            )

            setUser(response.data)

        } catch (error) {
            console.log(error)
            navigate('/');
        }
    }


    // workout di user
    async function userWorkouts(id) {
        try {
            const response = await axios.get(`http://api.run-club.test/api/user/${id}/workouts`, {
                withCredentials: true
            });
            setWorkouts(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    // workout a cui partecipa
    async function userRunsWorkouts(id) {
        try {
            const response = await axios.get(`http://api.run-club.test/api/user/${id}/runs/workouts`, {
                withCredentials: true
            });
            setRunsWorkouts(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }




    return (

        // il provider offre ai componenti figli i valori che gli passo
        <UserContext.Provider
            value={{
                user,
                setUser,
                workouts,
                setWorkouts,
                runsWorkouts,
                showUser,
                userWorkouts,
                userRunsWorkouts
            }}
        >

            {children}

        </UserContext.Provider>
    )

}

// custom hook per l'utilizzo del context, invece di scrivere useContext(AuthContext) scrivo useAuth()
function useUser() {

    const context = useContext(UserContext);
    return context;

}

export { UserProvider, useUser }