
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppWorkoutCard from "../components/AppWorkoutCard";
import { useAuth } from "../contexts/AuthContext";


export default function WorkoutsPage() {

    const { userAuth } = useAuth();

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

    const now = new Date();

    // ordinamento workout prima i futuri poi i passati mantendendo l'ordine cronologico
    const sorted = [
        ...workouts.filter((workout) => new Date(workout.date_time) > now),
        ...workouts.filter((workout) => new Date(workout.date_time) < now),
    ]


    return (
        <>
            <h1>Run Club</h1>

            <h2 className="text-xl font-bold text-indigo-800">Allenamenti</h2>
            <div className="grid grid-cols-4 gap-4">
                {

                    sorted
                        .map((workout) => (
                            <AppWorkoutCard key={workout.id} workout={workout} />
                        ))
                }
            </div>


            {console.log(new Date())}

            {userAuth && <Link to="/workout/create">Aggiungi un allenamento</Link>}

        </>
    );


}