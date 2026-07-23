
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


export default function IndexPage() {

    const navigate = useNavigate();

    const [workout, setWorkout] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        async function fetchWorkouts() {

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}`);

            const data = await response.json();

            setWorkout(data.results);

        }

        fetchWorkouts();

    }, []);

    async function destroyWorkout() {

        try {

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}`, {
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
            <h1>{workout.name}</h1>

            <div>
                <button onClick={() => destroyWorkout()}>Elimina allenamento</button>
            </div>
            <Link to={`/workout/${id}/edit`}>Modifica l'allenamento</Link>
        </>
    );


}