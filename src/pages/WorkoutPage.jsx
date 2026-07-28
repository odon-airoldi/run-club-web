
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function WorkoutPage() {

    const navigate = useNavigate();

    const { user } = useAuth();
    const { id } = useParams();
    const [workout, setWorkout] = useState({});


    useEffect(() => {

        async function showWorkout() {

            const response = await fetch(`http://api.run-club.test/api/workouts/${id}`);

            const data = await response.json();

            setWorkout(data.results);

        }

        showWorkout();

    }, [id]);


    const [visibility, setVisibility] = useState(false);
    function handleDestroyWorkout() {
        setVisibility(true)
    }

    async function destroyWorkout() {

        try {

            const response = await fetch(`http://api.run-club.test/api/workouts/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                console.error("Errore durante l'eliminazione")
                return;
            }
            navigate(`/`);

        } catch (err) {

            console.log("Errore di rete:", err);

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

            {workout.user?.id === user?.id && (
                <div>
                    <Link to={`/workout/${id}/edit`}>Modifica l'allenamento</Link>

                    {!visibility ?
                        (<div>
                            <button type="button" onClick={handleDestroyWorkout}>Elimina allenamento</button>
                        </div>)
                        :
                        (<div>
                            <button onClick={() => destroyWorkout()}>Vuoi eliminare definitivamente l'allenamento?</button>
                        </div >)
                    }
                </div>
            )}

        </>
    );

}