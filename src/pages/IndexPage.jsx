
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function IndexPage() {


    const [workouts, setWorkouts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch('http://api.run-club.test/api/workouts')
            .then(res => res.json())
            .then(data => {
                setWorkouts(data.results)
            })

    }, [])

    return (
        <>
            <h1>Run Club</h1>

            <div className="grid grid-cols-4 gap-4">
                {
                    workouts.map((workout) => (
                        <div key={workout.id} className="p-4 border border-gray-200">
                            <Link className="block" to={`/workout/${workout.id}`}>
                                <div>{new Date(workout.date_time).toLocaleDateString('it-IT')}</div>
                                <h2 className="font-bold">{workout.name}</h2>
                                <p>{workout.place_city}</p>
                                <p>{workout.distance} Km</p>
                                <p>{(workout.pace - workout.pace % 60) / 60}:{(workout.pace % 60) === 0 ? '00' : workout.pace % 60} min/km</p>
                            </Link>
                        </div>

                    ))
                }
            </div>

            <Link to="/workout/create">Aggiungi un allenamento</Link>

        </>
    );


}