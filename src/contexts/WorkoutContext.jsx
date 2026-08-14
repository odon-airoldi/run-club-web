import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// creazione context
const WorkoutContext = createContext();

// provider per offrire i dati ai componenti figli
function WorkoutProvider({ children }) {

    const navigate = useNavigate();
    const [workout, setWorkout] = useState({});

    // show workout
    async function showWorkout(id) {
        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/${id}`);
            setWorkout(response.data);

        } catch (error) {
            console.log(error)
        }

    }

    // converti pace da secondi in minuti:secondi
    function getWorkoutPaceTime(paceSeconds) {

        // if (!paceSeconds) return;

        const minutes = Math.floor(paceSeconds / 60)
        const seconds = String(Math.floor(paceSeconds % 60)).padStart(2, '0')

        return {
            minutes: minutes,
            seconds: seconds
        }

    }

    // calcola durata allenamento su distanza e passo
    function getWorkoutDurationTime(distanceKm, paceSeconds) {

        if (!distanceKm || !paceSeconds) return;

        const resultsInSeconds = distanceKm * paceSeconds

        const hours = Math.floor(resultsInSeconds / 3600)
        const minutes = String(Math.floor((resultsInSeconds % 3600) / 60)).padStart(2, '0')
        const seconds = String(Math.floor(resultsInSeconds % 60)).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}`

    }

    return (

        // il provider offre ai componenti figli i valori che gli passo
        <WorkoutContext.Provider
            value={{
                showWorkout,
                workout,
                getWorkoutPaceTime,
                getWorkoutDurationTime
            }}
        >

            {children}

        </WorkoutContext.Provider>
    )

}

// custom hook per l'utilizzo del context, invece di scrivere useContext(AuthContext) scrivo useAuth()
function useWorkout() {

    const context = useContext(WorkoutContext);
    return context;

}

export { WorkoutProvider, useWorkout }