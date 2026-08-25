import { Link } from "react-router-dom";
import { useWorkout } from "../contexts/WorkoutContext";
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function AppWorkoutCard({ workout }) {

    const { getWorkoutPaceTime } = useWorkout();

    const { minutes, seconds } = getWorkoutPaceTime(workout.pace);

    return (
        <div className={`border border-mauve-300 rounded-sm text-mauve-600 ${new Date(workout.date_time) < new Date() ? 'opacity-60' : ''}`}>
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
                    <h2 className="font-zalando font-semibold text-lg/6 text-indigo-800 mb-2">{workout.name}</h2>
                </div>

                <div className="flex justify-between px-4 py-2 text-sm text-xs uppercase">
                    <p><span className="text-mauve-400">Km</span> {workout.distance}</p>
                    <p><span className="text-mauve-400">Min/Km</span> {minutes}:{seconds}</p>
                </div>

            </Link>
        </div>
    )

} 