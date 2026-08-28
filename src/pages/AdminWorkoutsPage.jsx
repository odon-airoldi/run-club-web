
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import AppWorkoutCard from "../components/AppWorkoutCard";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButton";
import axios from "axios";



export default function AdminWorkoutsPage() {

    const { userAuth } = useAuth();
    const { sortedWorkouts } = useWorkout();
    const { getWorkoutPaceTime } = useWorkout();
    const [workouts, setWorkouts] = useState([]);
    const [itemSelected, setItemSelected] = useState(null);
    const [openModal, setOpenModal] = useState(null);


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

    // delete workout
    async function deleteWorkout(id) {

        try {
            const response = await axios.delete(`http://api.run-club.test/api/workouts/${id}`,
                {
                    withCredentials: true,
                    withXSRFToken: true,
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )
            setOpenModal(null)
            setItemSelected(null)
            // aggiorno lo stato di workouts filtrando il workout eliminato
            setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== id))

        } catch (error) {
            console.log(error.response);
        }

    }

    useEffect(() => {

        indexWorkout();

    }, []);

    const now = new Date();

    if (!userAuth || userAuth.role !== 'admin') return <Navigate to="/" replace />

    return (
        <div className="">
            <div className="text-center mb-8">
                <h1 className="font-semibold text-6xl font-zalando text-indigo-600">Allenamenti</h1>
            </div>

            <div className="">
                <div className="grid grid-cols-24 py-2 border-b border-mauve-300 text-xs uppercase text-mauve-400">
                    <div>ID</div>
                    <div className="col-span-6">Nome</div>
                    <div className="col-span-3">Creato da</div>
                    <div className="col-span-3">Città</div>
                    <div className="col-span-2">Data</div>
                    <div className="col-span-2">Ora</div>
                    <div className="col-span-2">Km</div>
                    <div className="col-span-2">Min/Km</div>
                    <div className="col-span-2">Partecipanti</div>
                    <div></div>
                </div>
            </div>
            <div className="">
                {
                    sortedWorkouts(workouts).map((workout) => {

                        const { minutes, seconds } = getWorkoutPaceTime(workout.pace);

                        return (
                            <div className={`grid grid-cols-24 py-2 border-b border-mauve-300 text-sm ${new Date(workout.date_time) < new Date() ? 'opacity-60' : ''}`} key={workout.id}>

                                <div>
                                    {workout.id}
                                </div>

                                <div className="col-span-6 pe-2">
                                    {workout.name}
                                </div>

                                <div className="col-span-3">
                                    {workout.user?.name}
                                </div>

                                <div className="col-span-3">
                                    {workout.place_city}
                                </div>

                                <div className="col-span-2">
                                    {new Date(workout.date_time).toLocaleDateString('it-IT', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: '2-digit'
                                    })}
                                </div>

                                <div className="col-span-2">
                                    {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                                </div>

                                <div className="col-span-2">
                                    {workout.distance}
                                </div>

                                <div className="col-span-2">
                                    {minutes}:{seconds}
                                </div>

                                <div className="col-span-2">
                                    {workout.users_run_count + 1}
                                </div>

                                <div className="flex justify-center items-start relative">
                                    <button onClick={() => setItemSelected(workout.id)} className="cursor-pointer block">
                                        <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
                                    </button>

                                    {itemSelected === workout.id &&
                                        <div className="absolute z-1 top-0 right-4 rounded-sm pt-4 pe-8 pb-6 ps-4 bg-mauve-200">
                                            <ul className="flex flex-col gap-1">
                                                <li><Link to={`/workout/${itemSelected}`}>Visualizza</Link></li>
                                                <li><Link to={`/workout/${itemSelected}/edit`}>Modifica</Link></li>
                                                <li><button onClick={() => setOpenModal(itemSelected)} className="cursor-pointer">Elimina</button></li>
                                            </ul>
                                        </div>
                                    }

                                </div>
                            </div>


                        )
                    })
                }
            </div>

            {openModal &&
                <div onClick={() => { setItemSelected(null); setOpenModal(null) }} className="fixed z-2 inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center">
                    <AppButton onClick={() => deleteWorkout(itemSelected)}>Vuoi eliminare definitivamente l'allenamento?</AppButton>
                </div >
            }

            { // se user è autenticato
                userAuth &&
                <div className="py-4 text-end">
                    <AppLink to="/workout/create">Aggiungi un allenamento</AppLink>
                </div>
            }

        </div >
    );


}