
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import axios from "axios";


export default function WorkoutPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userAuth } = useAuth();
    const { workout, showWorkout, getWorkoutPaceTime, getWorkoutDurationTime } = useWorkout();
    const [joinWorkout, setJoinWorkout] = useState(false);

    console.log(workout)

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
            navigate(`/`);

        } catch (error) {
            console.log(error.response);
        }

    }


    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-3 gap-24">
                    <div className="col-span-1">
                        <div className="text-sm"><Link to={`/users/${workout.user_id}`}>Creato da {workout.user?.name}</Link></div>

                        <h1 className="text-3xl font-bold text-indigo-800 mb-4">{workout.name}</h1>
                        <p className="mb-4">{workout.description}</p>

                        { // se user è admin o è proprietario del workout
                            (userAuth?.role === 'admin' || userAuth?.id === workout.user_id) &&
                            <div className="">
                                <Link to={`/workout/${id}/edit`}>Modifica l'allenamento</Link>
                                {!visibility ?
                                    <div>
                                        <button type="button" onClick={handleDeleteWorkout}>Elimina allenamento</button>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={() => deleteWorkout()}>Vuoi eliminare definitivamente l'allenamento?</button>
                                    </div >
                                }
                            </div>
                        }
                        { // se user non è proprietario del workout
                            (userAuth?.id !== workout.user_id) &&
                            <div>
                                <button onClick={userJoinWorkout} className="bg-indigo-800 hover:bg-indigo-700 px-6 py-4 text-white text-sm tracking-wider cursor-pointer uppercase duration-400 ease-in-out">
                                    {joinWorkout ? 'Ti sei unito al workout' : 'Partecipa'}
                                </button>
                            </div>
                        }
                    </div>
                    <div className="col-span-2">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-indigo-500 capitalize">
                                    {new Date(workout.date_time).toLocaleDateString('it-IT', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </div>
                            </div>
                            <div>
                                <div>Ora</div>
                                <div className="text-indigo-500">
                                    {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                                </div>
                                <div>Durata ritrovo gruppo</div>
                                <div className="text-indigo-500">{workout.buffer_time} min</div>
                            </div>
                            <div>
                                <div>Luogo di partenza</div>
                                <div className="text-indigo-500">
                                    {workout.place_city}<br />
                                    {workout.place_address}
                                </div>
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
                            <div className="col-span-3">
                                <div>{workout.users_run?.length} Partecipanti</div>
                                <div className="grid auto-cols-max grid-flow-col gap-4">
                                    {

                                        workout.users_run?.map((user) => (
                                            <Link to={`/users/${user.id}`} key={user.id}>
                                                <div className="">{user.name}</div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );

}