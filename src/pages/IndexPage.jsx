
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function IndexPage() {


    const [workouts, setWorkouts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch('http://run-club-api.test/api/workouts/')
            .then(res => res.json())
            .then(data => {
                setWorkouts(data.results)
            })

    }, [])

    return (
        <>
            <h1>Run Club</h1>

            {
                workouts.map((workout) => (
                    <div key={workout.id}>
                        <div><Link to={`/workout/${workout.id}`}>{workout.name}</Link></div>
                    </div>

                ))
            }
            <Link to="/workout/create">Aggiungi un allenamento</Link>

        </>
    );


}