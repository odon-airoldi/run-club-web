
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppWorkoutCard from "../components/AppWorkoutCard";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import AppLink from "../components/AppLink";


export default function AdminWorkoutsPage() {

    const { userAuth } = useAuth();
    const { sortedWorkouts } = useWorkout();

    const [workouts, setWorkouts] = useState([]);

    const { getWorkoutPaceTime } = useWorkout();


    // index workouts
    async function indexWorkout() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/`);

            // setto workouts utilizzando la funzione per riordinarli
            setWorkouts(response.data)


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        indexWorkout();


    }, []);

    const now = new Date();

    return (
        <div className="">
            <h2 className="font-semibold text-8xl mb-4 font-zalando text-indigo-600">Allenamenti</h2>


            <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-200 text-xs uppercase text-mauve-400">
                    <div>ID</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-2">Ruolo</div>
                    <div className="col-span-2">Allenamenti creati</div>
                    <div className="col-span-2">Partecipazioni</div>
                    <div>Modifica</div>
                    <div>Elimina</div>
                </div>
            </div>

            <div className="">

                {
                    sortedWorkouts(workouts).map((workout) => {

                        const { minutes, seconds } = getWorkoutPaceTime(workout.pace);

                        return (
                            <div className={`grid grid-cols-12 gap-4 py-2 border-b border-gray-200 text-sm ${new Date(workout.date_time) < new Date() ? 'opacity-60' : ''}`} key={workout.id}>
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
                                <div className="flex gap-1">
                                    <span className="text-mauve-400">Ore</span>
                                    {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                                </div>

                                <div className="text-xs mb-1 uppercase text-mauve-400">
                                    {workout.place_city}
                                </div>
                                <h2 className="font-zalando font-semibold text-indigo-600 mb-2">{workout.name}</h2>
                                <div className="text-xs mb-1 uppercase text-mauve-400">
                                    {workout.users_run_count + 1} {workout.users_run_count + 1 > 1 ? 'partecipanti' : 'partecipante'}
                                </div>

                                <div className="flex justify-between px-4 py-2 text-xs uppercase">
                                    <div><span className="text-mauve-400">Km</span> {workout.distance}</div>
                                    <div><span className="text-mauve-400">Min/Km</span> {minutes}:{seconds}</div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>


            { // se user è autenticato
                userAuth && <AppLink to="/workout/create">Aggiungi un allenamento</AppLink>
            }

        </div>
    );


}