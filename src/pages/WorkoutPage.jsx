
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import axios from "axios";


export default function WorkoutPage() {

    const navigate = useNavigate();

    const { user } = useAuth();
    const { getWorkoutPaceTime, getWorkoutDurationTime } = useWorkout();
    const { id } = useParams();
    const [workout, setWorkout] = useState({});
    const [joinWorkout, setJoinWorkout] = useState(false);




    // show workout
    async function showWorkout() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/workouts/${id}`);

            setWorkout(response.data);

            setJoinWorkout(response.data.users_run?.some(user_run => user_run.id === user?.id) ?? false)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {

        showWorkout();

    }, [id]);


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
            setJoinWorkout(!joinWorkout)
            console.log(response)


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

    console.log(workout)


    return (
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <div className="text-sm">Creato da {workout.user?.name}</div>

                    <h1 className="text-3xl font-bold text-indigo-800">{workout.name}</h1>
                    <p className="">{workout.description}</p>

                    {workout.user_id === user.id ? // se sei il proprietario del workout
                        <div className="p-4">
                            <Link to={`/workout/${id}/edit`}>Modifica l'allenamento</Link>

                            {!visibility ?
                                (<div>
                                    <button type="button" onClick={handleDeleteWorkout}>Elimina allenamento</button>
                                </div>)
                                :
                                (<div>
                                    <button onClick={() => deleteWorkout()}>Vuoi eliminare definitivamente l'allenamento?</button>
                                </div >)
                            }
                        </div>
                        : // altrimenti
                        < div >
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
                            <div className="text-indigo-500">{getWorkoutPaceTime(workout.pace)}</div>
                        </div>
                        <div>
                            <div>Proiezione durata allenamento</div>
                            <div className="text-indigo-500">{getWorkoutDurationTime(workout.distance, workout.pace)}</div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    );

}