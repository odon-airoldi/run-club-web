
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function IndexPage() {


    const [workout, setWorkout] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        async function fetchWorkouts() {

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}`);

            const data = await response.json();

            setWorkout(data.results);

        }

        fetchWorkouts();


    }, [])

    return (
        <>
            <h1>{workout.name}</h1>


            <Link>Elimina allenamento</Link>
        </>
    );


}