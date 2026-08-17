
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppWorkoutCard from "../components/AppWorkoutCard";
import { useAuth } from "../contexts/AuthContext";


export default function WorkoutsPage() {

    const { user } = useAuth();

    const [workouts, setWorkouts] = useState([]);


    // index workouts
    async function indexWorkout() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/`);

            setWorkouts(response.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        indexWorkout();

    }, []);

    console.log(workouts)


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

            {user && <Link to="/workout/create">Aggiungi un allenamento</Link>}

        </>
    );


}