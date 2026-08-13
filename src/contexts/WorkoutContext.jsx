import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// creazione context
const WorkoutContext = createContext();

// provider per offrire i dati ai componenti figli
function WorkoutProvider({ children }) {

    const navigate = useNavigate();




    return (

        // il provider offre ai componenti figli i valori che gli passo
        <WorkoutContext.Provider
            value={{

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