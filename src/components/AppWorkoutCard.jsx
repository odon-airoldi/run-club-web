import { Link } from "react-router-dom";

export default function AppWorkoutCard({ workout }) {

    return (
        <div className="p-4 border border-gray-200">
            <Link className="block" to={`/workout/${workout.id}`}>
                <div>{new Date(workout.date_time).toLocaleDateString('it-IT')}</div>
                <h2 className="font-bold">{workout.name}</h2>
                <p>{workout.place_city}</p>
                <p>{workout.distance} Km</p>
                <p>{(workout.pace - workout.pace % 60) / 60}:{(workout.pace % 60) === 0 ? '00' : workout.pace % 60} min/km</p>
            </Link>
        </div>
    )

} 