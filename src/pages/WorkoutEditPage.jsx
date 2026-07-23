
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function IndexPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    async function editWorkout(e) {

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

            const response = await fetch(`http://run-club-api.test/api/workouts/${id}/edit`, {
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
            console.log(workout);

        } catch (err) {

            console.error('Errore di rete:', err);

        }

    }

    return (
        <>
            <h1>Aggiorna l'allenamento</h1>
            <form onSubmit={editWorkout}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="border" type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea className="border" type="text" id="description" name="description"></textarea>
                </div>
                <div>
                    <label htmlFor="date">Data</label>
                    <input className="border" type="date" id="date" name="date" />
                </div>
                <div>
                    <label htmlFor="time">Ora</label>
                    <input className="border" type="time" id="time" name="time" />
                </div>
                <div>
                    <label htmlFor="place_city">Città</label>
                    <input className="border" type="text" id="place_city" name="place_city" />
                </div>
                <div>
                    <label htmlFor="place_address">Indirizzo</label>
                    <input className="border" type="text" id="place_address" name="place_address" />
                </div>
                <div>
                    <label htmlFor="buffer_time">Tempo di attesa</label>
                    <input className="border" type="number" id="buffer_time" name="buffer_time" /> min
                </div>
                <div>
                    <label htmlFor="distance">Distanza</label>
                    <input className="border" type="number" id="distance" name="distance" /> Km
                </div>
                <div>
                    <label htmlFor="pace_m">Passo</label>
                    <input className="border" type="number" id="pace_m" name="pace_m" min="0" max="59" /> min
                    <input className="border" type="number" id="pace_s" name="pace_s" min="0" max="59" /> sec
                </div>
                <div>
                    <button type="submit">Modifica</button>
                </div>
            </form>

            <Link to="/">Tutti gli allenamenti</Link>
        </>
    );

}