
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function IndexPage() {


    const [workout, setWorkout] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://run-club-api.test/api/workouts/${id}`)
            .then(res => res.json())
            .then(data => {
                setWorkout(data.results)
            })

    }, [])

    return (
        <>
            <h1>{workout.name}</h1>
        </>
    );


}