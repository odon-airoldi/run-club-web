import { Link } from "react-router-dom";
import { useWorkout } from "../contexts/WorkoutContext";
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

export default function AppWorkoutCard({ workout }) {

    const { getWorkoutPaceTime } = useWorkout();

    const { minutes, seconds } = getWorkoutPaceTime(workout.pace);

    return (
        <div className="border border-gray-200 rounded-sm">
            <Link className={`flex h-full flex-col ${new Date(workout.date_time) < new Date() ? 'text-gray-400' : ''}`} to={`/workout/${workout.id}`}>


                <div className="flex justify-between px-4 py-2 text-sm capitalize">
                    <div className="flex items-center">
                        <CalendarDaysIcon className="size-4" />
                        {new Date(workout.date_time).toLocaleDateString('it-IT', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </div>
                    <div>
                        {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </div>
                </div>

                <div className="flex-1 border-y border-gray-200 px-4 py-4">
                    <p className="text-xs mb-1 uppercase">{workout.place_city}</p>
                    <h2 className="font-semibold text-base/5 mb-2">{workout.name}</h2>
                </div>

                <div className="px-4 py-2 text-sm">
                    <div className="flex justify-between">
                        <p>{workout.distance} Km</p>
                        <p>{minutes}:{seconds} min/km</p>
                    </div>
                </div>

            </Link>
        </div>
    )

} 