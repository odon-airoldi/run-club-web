
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButton";
import AppUserPicture from "../components/AppUserPicture";
import AppLinkArrowLeft from "../components/AppLinkArrowLeft";
import axios from "axios";


export default function WorkoutPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userAuth } = useAuth();
    const { workout, showWorkout, getWorkoutPaceTime, getWorkoutDurationTime } = useWorkout();
    const [joinWorkout, setJoinWorkout] = useState(null);
    const now = new Date();
    const [openModal, setOpenModal] = useState(0);
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
                <div className="grid lg:grid-cols-2">
                    <div className="border-b lg:border-b-0 lg:border-r border-mauve-300">
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
                                Creato da {workout.user ? `${workout.user.first_name} ${workout.user.last_name}` : 'Utente eliminato'}
                            </div>
                            <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-4">{workout.name}</h1>
                            <p className="mb-6">{workout.description}</p>

                            <div className="flex justify-between items-end">
                                <div onClick={() => setOpenModal(2)} >
                                    <div className="flex gap-1 text-white text-sm/[30px] mb-2">
                                        <AppUserPicture user={workout.user} className="w-8 h-8" />
                                        {
                                            workout.users_run?.map((user) => (
                                                <AppUserPicture user={user} className="w-8 h-8" />
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
                                {openModal === 2 &&
                                    <div onClick={() => setOpenModal(0)} className="fixed inset-0 bg-mauve-200/50 backdrop-blur-xs p-10">
                                        <div className="sm:w-128 h-full sm:mx-auto bg-white text-center">
                                            <h2>Partecipanti</h2>
                                            <ul>
                                                <li><Link to={`/user/${workout.user.id}`}>{workout.user.first_name} {workout.user.last_name}</Link></li>
                                                {
                                                    workout.users_run?.map((user) => (
                                                        <li><Link to={`/user/${user.id}`}>{user.first_name} {user.last_name}</Link></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div >
                                }
                                <div>
                                    { // se la data del workout è maggiore rispetto alla data attuale
                                        new Date(workout.date_time) > now ?
                                            (!userAuth ? // se user non è autenticato
                                                <AppLink to="/">Accedi per partecipare</AppLink>
                                                : // altrimenti se user non è proprietario del workout
                                                userAuth?.id !== workout.user_id &&
                                                <AppButton onClick={userJoinWorkout}>
                                                    {joinWorkout ? 'Ti sei unito all\'allenamento' : 'Partecipa'}
                                                </AppButton>
                                            )
                                            //altrimenti
                                            : <div className="inline-flex justify-center bg-mauve-200 px-3 py-1 text-sm/6 font-zalando font-semibold">Allenamento concluso</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 gap-8">

                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Punto di ritrovo</div>
                                <div className="text-indigo-600">
                                    {workout.place_city}<br />
                                    {workout.place_address}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Tempo di attesa</div>
                                <div className="text-indigo-600">{workout.buffer_time} Min</div>
                            </div>

                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Distanza</div>
                                <div className="text-indigo-600">{workout.distance} Km</div>
                            </div>
                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Passo</div>
                                <div className="text-indigo-600">{minutes}:{seconds} Min/Km</div>
                            </div>
                            <div>
                                <div className="text-xs mb-1 uppercase text-mauve-400">Stima tempo</div>
                                <div className="text-indigo-600">{getWorkoutDurationTime(workout.distance, workout.pace)}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            { // se user è admin o è proprietario del workout
                (userAuth?.role === 'admin' || userAuth?.id === workout.user_id) &&
                <div className="flex flex-col sm:flex-row justify-end gap-2 py-4">
                    <AppLinkArrowLeft to={`/workouts`}>Tutti gli allenamenti</AppLinkArrowLeft>


                    <Link to={`/workout/${id}/edit`} className="border border-mauve-300 text-xs px-4 py-2 uppercase text-mauve-400 text-center cursor-pointer">Modifica</Link>

                    <button onClick={() => setOpenModal(1)} className="border border-mauve-300 text-xs px-4 py-2 uppercase text-mauve-400 text-center cursor-pointer">Elimina</button>
                    {openModal === 1 &&
                        <div onClick={() => setOpenModal(0)} className="fixed inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center">
                            <AppButton onClick={deleteWorkout}>Vuoi eliminare definitivamente l'allenamento?</AppButton>
                        </div >
                    }
                </div>
            }
        </div >
    );

}