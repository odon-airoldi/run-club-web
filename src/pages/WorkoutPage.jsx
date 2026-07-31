
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";


export default function WorkoutPage() {

    const navigate = useNavigate();

    const { user } = useAuth();
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


    return (
        <>
            <h1 className="text-3xl font-bold">{workout.name}</h1>
            <small>{workout.user?.name}</small>

            <div>
                {new Date(workout.date_time).toLocaleDateString('it-IT')}
            </div>
            <div>
                {new Date(workout.date_time).toLocaleTimeString('it-IT', {
                    hour: 'numeric',
                    minute: 'numeric'
                })}
            </div>
            <div>
                {workout.pace}
            </div>
            <div>
                <button onClick={userJoinWorkout}>
                    {joinWorkout ? 'Ti sei unito al workout' : 'Voglio partecipare'}
                </button>
            </div>

            {workout.user?.id === user?.id && (
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
            )}

        </>
    );

}