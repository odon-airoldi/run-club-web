
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function IndexPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [workout, setWorkout] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        place_city: '',
        place_address: '',
        buffer_time: '',
        distance: '',
        pace_m: '',
        pace_s: '',
    });

    useEffect(() => {

        async function showWorkout() {

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}`);

            const data = await response.json();

            setWorkout({
                ...data.results,
                date: data.results.date_time.slice(0, 10),
                time: data.results.date_time.slice(11, 16),
                pace_m: (data.results.pace - data.results.pace % 60) / 60,
                pace_s: data.results.pace % 60,
            });

        }

        showWorkout();

    }, []);


    async function hendleEditWorkout(e) {

        e.preventDefault()

        try {

            const updateWorkout = {
                name: e.target.name.value,
                description: e.target.description.value,
                date_time: `${e.target.date.value} ${e.target.time.value}:00`,
                place_city: e.target.place_city.value,
                place_address: e.target.place_address.value,
                buffer_time: e.target.buffer_time.value,
                distance: e.target.distance.value,
                pace: Number(e.target.pace_m.value) * 60 + Number(e.target.pace_s.value)
            }

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateWorkout)
            })

            const workout = await response.json();

            if (!response.ok) {
                console.error(workout);
                return;
            }

            navigate(`/workout/${workout.id}`);

        } catch (err) {

            console.error('Errore di rete:', err);

        }

    }

    function handleChange(e) {

        setWorkout({
            ...workout,
            [e.target.name]: e.target.value,
        })

    }

    return (
        <>
            <h1>Aggiorna l'allenamento</h1>
            <form onSubmit={hendleEditWorkout}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="border" type="text" id="name" name="name" value={workout.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea className="border" type="text" id="description" name="description" value={workout.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="date">Data</label>
                    <input className="border" type="date" id="date" name="date" value={workout.date} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="time">Ora</label>
                    <input className="border" type="time" id="time" name="time" value={workout.time} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="place_city">Città</label>
                    <input className="border" type="text" id="place_city" name="place_city" value={workout.place_city} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="place_address">Indirizzo</label>
                    <input className="border" type="text" id="place_address" name="place_address" value={workout.place_address} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="buffer_time">Tempo di attesa</label>
                    <input className="border" type="number" id="buffer_time" name="buffer_time" value={workout.buffer_time} onChange={handleChange} /> min
                </div>
                <div>
                    <label htmlFor="distance">Distanza</label>
                    <input className="border" type="number" id="distance" name="distance" value={workout.distance} onChange={handleChange} /> Km
                </div>
                <div>
                    <label htmlFor="pace_m">Passo</label>
                    <input className="border" type="number" id="pace_m" name="pace_m" min="0" max="59" value={workout.pace_m} onChange={handleChange} /> min
                    <input className="border" type="number" id="pace_s" name="pace_s" min="0" max="59" value={workout.pace_s} onChange={handleChange} /> sec
                </div>
                <div>
                    <button type="submit">Modifica</button>
                </div>
            </form>

            <Link to="/">Tutti gli allenamenti</Link>
        </>
    );

}