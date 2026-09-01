
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppWorkoutCard from "../components/AppWorkoutCard";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import AppLink from "../components/AppLink";


export default function WorkoutsPage() {

    const { userAuth } = useAuth();
    const { sortedWorkouts } = useWorkout();

    const [workouts, setWorkouts] = useState([]);


    // index workouts
    async function indexWorkout() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/`);

            // setto workouts utilizzando la funzione per riordinarli
            setWorkouts(response.data)


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        indexWorkout();


    }, []);



    const now = new Date();

    return (
        <div className="">
            <div className="text-center mb-8">
                <h2 className="font-semibold text-6xl font-zalando text-indigo-600">Allenamenti</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {

                    sortedWorkouts(workouts).map((workout) => (
                        <AppWorkoutCard key={workout.id} workout={workout} />
                    ))
                }
            </div>




        </div>
    );


}