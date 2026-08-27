
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButtton";
import axios from "axios";


export default function WorkoutPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userAuth } = useAuth();
    const { workout, showWorkout, getWorkoutPaceTime, getWorkoutDurationTime } = useWorkout();
    const [joinWorkout, setJoinWorkout] = useState(null);
    const now = new Date();
    const [openModal, setOpenModal] = useState(false);
    const { minutes, seconds } = getWorkoutPaceTime(workout.pace)


    useEffect(() => {

        // mi servo dal context della funzione per chiamata axios passando come parametro id
        showWorkout(id);

    }, [id, joinWorkout]);


    useEffect(() => {

        // true se fra users che partecipano al workout c'è un user con un id uguale all'id di user autenticato altrimenti false
        setJoinWorkout(workout.users_run?.some(user_run => user_run.id === userAuth?.id) ?? false)


    }, [workout]);


    // user runs workouts
    const userJoinWorkout = async () => {
        try {
            const response = await axios.post(`http://api.run-club.test/api/user/runs/workouts/${id}`,
                {
                },
                {
                    withCredentials: true,
                    withXSRFToken: true,
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )
            // toggle su valore booleano
            setJoinWorkout(!joinWorkout)

        } catch (error) {
            console.log(error.response)
        }
    }

    // delete workout
    async function deleteWorkout() {

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
            navigate('/');

        } catch (error) {
            console.log(error.response);
        }

    }




    return (
        <div className="">
            <div className="border border-mauve-300 rounded-sm text-mauve-600">
                <div className="grid grid-cols-2">
                    <div className="border-r border-mauve-300">
                        <div className="p-4 flex gap-6 text-xl uppercase mb-2 border-b border-mauve-300">
                            <div>
                                <span className="text-mauve-400">
                                    {new Date(workout.date_time).toLocaleDateString('it-IT', {
                                        weekday: 'long'
                                    })}
                                    &nbsp;
                                </span>
                                <span>
                                    {new Date(workout.date_time).toLocaleDateString('it-IT', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div>
                                <span className="text-mauve-400">Ore&nbsp;</span>
                                <span>
                                    {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                                </span>
                            </div>

                        </div>
                        <div className="px-4 pt-2 pb-4">
                            <div className="text-xs uppercase text-mauve-400 mb-1">
                                Creato da {workout.user ? workout.user.name : 'Utente eliminato'}
                            </div>
                            <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-4">{workout.name}</h1>
                            <p className="mb-6">{workout.description}</p>

                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="flex gap-1 text-white text-sm/[30px] mb-2">
                                        <Link to={`/users/${workout.user?.id}`} className="w-[32px] aspect-square rounded-full bg-mauve-400 flex justify-center">
                                            {workout.user?.name.split(' ').map(i => i[0]).join('')}
                                        </Link>
                                        {
                                            workout.users_run?.map((user) => (
                                                <Link to={`/users/${user.id}`} key={user.id} className="w-[32px] aspect-square rounded-full bg-mauve-400 flex justify-center">
                                                    <div className="">{user.name.split(' ').map(i => i[0]).join('')}</div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                    <div className="text-xs uppercase text-mauve-400">
                                        {workout.users_run?.length + 1}
                                        {
                                            new Date(workout.date_time) > now
                                                ? (workout.users_run?.length + 1 > 1 ? ' persone parteciperanno' : ' persona parteciperà')
                                                : (workout.users_run?.length + 1 > 1 ? ' persone hanno partecipato' : ' persona ha partecipato')
                                        }
                                    </div>
                                </div>
                                <div>
                                    { // se la data del workout è maggiore rispetto alla data attuale
                                        new Date(workout.date_time) > now ?
                                            (!userAuth ? // se user non è autenticato
                                                <AppLink to="/">Accedi per partecipare</AppLink>
                                                : // altrimenti se user non è proprietario del workout
                                                userAuth?.id !== workout.user_id &&
                                                <AppButton onClick={userJoinWorkout}>
                                                    {joinWorkout ? 'Ti sei unito al workout' : 'Partecipa'}
                                                </AppButton>
                                            )
                                            //altrimenti
                                            : <div>Workout concluso</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-8">

                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Punto di ritrovo</div>
                                <div className="text-indigo-500">
                                    {workout.place_city}<br />
                                    {workout.place_address}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Tempo di attesa</div>
                                <div className="text-indigo-500">{workout.buffer_time} Min</div>
                            </div>

                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Distanza</div>
                                <div className="text-indigo-500">{workout.distance} Km</div>
                            </div>
                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Passo</div>
                                <div className="text-indigo-500">{minutes}:{seconds} Min/Km</div>
                            </div>
                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Stima tempo</div>
                                <div className="text-indigo-500">{getWorkoutDurationTime(workout.distance, workout.pace)}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            { // se user è admin o è proprietario del workout

                (userAuth?.role === 'admin' || userAuth?.id === workout.user_id) &&
                <div className="flex justify-end gap-2 py-4">
                    <Link to={`/workout/${id}/edit`} className="border border-mauve-300 text-xs px-4 py-2 uppercase text-mauve-400 cursor-pointer">Modifica</Link>

                    <button onClick={() => setOpenModal(true)} className="border border-mauve-300 text-xs px-4 py-2 uppercase text-mauve-400 cursor-pointer">Elimina</button>
                    {openModal &&
                        <div onClick={() => setOpenModal(false)} className="fixed inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center">
                            <AppButton onClick={deleteWorkout}>Vuoi eliminare definitivamente l'allenamento?</AppButton>
                        </div >
                    }
                </div>
            }
        </div >
    );

}