import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// creazione context
const UserContext = createContext();

// provider per offrire i dati ai componenti figli
function UserProvider({ children }) {

    const navigate = useNavigate();
    // const [workout, setWorkout] = useState({});
    // const [loading, setLoading] = useState(true);

    // show workout
    // async function showWorkout(id) {
    //     try {
    //         const response = await axios.get(`http://api.run-club.test/api/workouts/${id}`);
    //         setWorkout(response.data);

    //     } catch (error) {
    //         console.log(error)
    //         navigate('/');
    //     } finally {
    //         setLoading(false)
    //     }

    // }





    return (

        // il provider offre ai componenti figli i valori che gli passo
        <UserContext.Provider
            value={{

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