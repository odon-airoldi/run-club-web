import { Link } from "react-router-dom";
import { useWorkout } from "../contexts/WorkoutContext";

export default function AppWorkoutCard({ workout }) {

    // console.log(workout)

    const { getWorkoutPaceTime } = useWorkout();

    const { minutes, seconds } = getWorkoutPaceTime(workout.pace);

    return (
        <div className={`border border-mauve-300 rounded-sm ${new Date(workout.date_time) < new Date() ? 'opacity-60' : ''}`}>
            <Link className="flex h-full flex-col" to={`/workout/${workout.id}`}>

                <div className="flex justify-between px-4 py-2 text-xs uppercase">
                    <div className="flex gap-1">
                        <span className="text-mauve-400">
                            {new Date(workout.date_time).toLocaleDateString('it-IT', {
                                weekday: 'long'
                            })}
                        </span>
                        {new Date(workout.date_time).toLocaleDateString('it-IT', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </div>
                    <div className="flex gap-1">
                        <span className="text-mauve-400">Ore</span>
                        {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </div>
                </div>

                <div className="flex-1 border-y border-mauve-300 px-4 py-4">
                    <div className="text-xs mb-1 uppercase text-mauve-400">
                        {workout.place_city}
                    </div>
                    <h2 className="font-zalando font-semibold text-lg/6 text-indigo-600 mb-2">{workout.name}</h2>
                    <div className="text-xs mb-1 uppercase text-mauve-400">
                        {workout.users_run_count + 1} {workout.users_run_count + 1 > 1 ? 'partecipanti' : 'partecipante'}
                    </div>
                </div>


                <div className="flex justify-between px-4 py-2 text-xs uppercase">
                    <div><span className="text-mauve-400">Km</span> {workout.distance}</div>
                    <div><span className="text-mauve-400">Min/Km</span> {minutes}:{seconds}</div>
                </div>

            </Link>
        </div>
    )

} 