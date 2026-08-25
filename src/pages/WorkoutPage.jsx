
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
    const [joinWorkout, setJoinWorkout] = useState(false);
    const now = new Date();


    useEffect(() => {

        // mi servo dal context della funzione per chiamata axios passando come parametro id
        showWorkout(id);

        // true se fra users che partecipano al workout c'è un user con un id uguale all'id di user autenticato altrimenti false
        setJoinWorkout(workout.users_run?.some(user_run => user_run.id === userAuth?.id) ?? false)


    }, [id]);

    const { minutes, seconds } = getWorkoutPaceTime(workout.pace)


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

    const [visibility, setVisibility] = useState(false);
    function handleDeleteWorkout() {
        setVisibility(true)
    }

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
                    <div className="p-4 border-r border-mauve-300">
                        <div className="flex gap-6 text-xl uppercase mb-2">
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

                        <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-8">{workout.name}</h1>
                        <p className="mb-4 text-mauve-600">{workout.description}</p>

                        <div>
                            <div className="text-sm">
                                Creato da {workout.user ?
                                    <Link to={`/users/${workout.user_id}`}>{workout.user?.name}</Link>
                                    : 'Utente eliminato'
                                }
                            </div>

                            <div>
                                {workout.users_run?.length + 1}
                                {
                                    new Date(workout.date_time) > now
                                        ? workout.users_run?.length > 1 ? 'persone parteciperanno' : 'persona parteciperà'
                                        : workout.users_run?.length > 1 ? 'persone hanno partecipato' : 'persona ha partecipato'
                                }
                            </div>
                            <div className="grid auto-cols-max grid-flow-col gap-4">
                                {workout.user?.name}
                                {

                                    workout.users_run?.map((user) => (
                                        <Link to={`/users/${user.id}`} key={user.id}>
                                            <div className="">{user.name}</div>
                                        </Link>
                                    ))
                                }
                            </div>

                            { // se user non è proprietario del workout e la data del workout è maggiore rispetto alla data attuale
                                userAuth?.id !== workout.user_id && (
                                    new Date(workout.date_time) > now ?
                                        <AppButton onClick={userJoinWorkout}>
                                            {joinWorkout ? 'Ti sei unito al workout' : 'Partecipa'}
                                        </AppButton>
                                        : <div>Workout concluso</div>
                                )

                            }
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-3 gap-4">

                            <div>
                                <div>Luogo di partenza</div>
                                <div className="text-indigo-500">
                                    {workout.place_city}<br />
                                    {workout.place_address}
                                </div>
                            </div>
                            <div>
                                <div>Durata ritrovo gruppo</div>
                                <div className="text-indigo-500">{workout.buffer_time} min</div>
                            </div>

                            <div>
                                <div>Distanza</div>
                                <div className="text-indigo-500">{workout.distance} Km</div>
                            </div>
                            <div>
                                <div>Passo</div>
                                <div className="text-indigo-500">{minutes}:{seconds}</div>
                            </div>
                            <div>
                                <div>Proiezione durata allenamento</div>
                                <div className="text-indigo-500">{getWorkoutDurationTime(workout.distance, workout.pace)}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            { // se user è admin o è proprietario del workout
                (userAuth?.role === 'admin' || userAuth?.id === workout.user_id) &&
                <div className="my-4 flex gap-1">
                    <AppLink to={`/workout/${id}/edit`}>Modifica</AppLink>
                    {!visibility ?

                        <AppButton onClick={handleDeleteWorkout}>Elimina allenamento</AppButton>
                        :
                        <div>
                            <AppButton onClick={() => deleteWorkout()}>Vuoi eliminare definitivamente l'allenamento?</AppButton>
                        </div >
                    }
                </div>
            }
        </div >
    );

}