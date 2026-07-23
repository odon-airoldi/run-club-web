
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


export default function IndexPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [workout, setWorkout] = useState({});

    useEffect(() => {

        async function showWorkout() {

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}`);

            const data = await response.json();

            setWorkout(data.results);

        }

        showWorkout();

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