import { Link } from "react-router-dom";
import { useWorkout } from "../contexts/WorkoutContext";




export default function AppWorkoutCard({ workout }) {



    const { getWorkoutPaceTime } = useWorkout();

    const { minutes, seconds } = getWorkoutPaceTime(workout.pace);

    return (
        <div className="p-4 border border-gray-200">
            <Link className={new Date(workout.date_time) < new Date() ? 'block text-gray-400' : 'block'} to={`/workout/${workout.id}`}>
                <div>{new Date(workout.date_time).toLocaleDateString('it-IT')}</div>
                <h2 className="font-bold">{workout.name}</h2>
                <p>{workout.place_city}</p>
                <p>{workout.distance} Km</p>
                <p>{minutes}:{seconds} min/km</p>
            </Link>
        </div>
    )

} 