
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppWorkoutCard from "../components/AppWorkoutCard";


export default function WorkoutsPage() {


    const [workouts, setWorkouts] = useState([]);


    // index workouts
    async function indexWorkout() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/`);

            setWorkouts(response.data)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        indexWorkout();

    }, []);


    return (
        <>
            <h1>Run Club</h1>

            <div className="grid grid-cols-4 gap-4">
                {
                    workouts.map((workout) => (
                        <AppWorkoutCard key={workout.id} workout={workout} />
                    ))
                }
            </div>

            <Link to="/workout/create">Aggiungi un allenamento</Link>

        </>
    );


}