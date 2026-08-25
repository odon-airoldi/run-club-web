
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import AppButton from "../components/AppButtton";
import AppLink from "../components/AppLink";
import AppInput from "../components/AppInput";
import AppTextarea from "../components/AppTextarea";
import axios from "axios";


export default function WorkoutEditPage() {

    const navigate = useNavigate();

    const { userAuth } = useAuth();

    const { id } = useParams();

    const { workout, loading, setWorkout, showWorkout, getWorkoutPaceTime } = useWorkout();

    const [editWorkout, setEditWorkout] = useState(null);

    useEffect(() => {

        showWorkout(id);

    }, [id]);

    useEffect(() => {

        if (loading) return;

        // destrutturo l'oggetto di risposta della funzione per formattare pace da secondi a minuti e secondi
        const { minutes, seconds } = getWorkoutPaceTime(workout.pace)

        // converto data UTC in formato/fuso orario it-IT e riordino in ISO aaaa-mm-gg richiesto dall'input
        const date = new Date(workout.date_time).toLocaleDateString('it-IT').split("/").reverse().join("-")

        // converto ora UTC in formato/fuso orario it-IT già compatibile con il formato richiesto dall'input
        const time = new Date(workout.date_time).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit'
        })


        setEditWorkout({
            ...workout,
            date: date,
            time: time,
            pace_m: minutes,
            pace_s: seconds,
        });

    }, [workout]);




    async function handleSubmitWorkout(e) {

        e.preventDefault()

        try {

            const updateWorkout = {
                name: editWorkout.name,
                description: editWorkout.description,
                date_time: new Date(`${editWorkout.date}T${editWorkout.time}:00`).toISOString(),
                place_city: editWorkout.place_city,
                place_address: editWorkout.place_address,
                buffer_time: editWorkout.buffer_time,
                distance: editWorkout.distance,
                pace: Number(editWorkout.pace_m) * 60 + Number(editWorkout.pace_s)
            }

            const response = await axios.put(`http://api.run-club.test/api/workouts/${id}`,

                updateWorkout,

                {
                    withCredentials: true,
                    withXSRFToken: true
                }
            )

            navigate(`/workout/${response.data.id}`);

        } catch (error) {

            console.error(error.response);

        }

    }

    function handleChange(e) {

        setEditWorkout({
            ...editWorkout,
            [e.target.name]: e.target.value,
        })

    }

    // redirect al render se user non admin e non è proprietario del workout
    if (userAuth.role !== 'admin' && userAuth.id !== workout.user_id) return <Navigate to="/" replace />

    return (
        <>
            {editWorkout &&
                <div>
                    <h1>Aggiorna l'allenamento</h1>
                    <form onSubmit={handleSubmitWorkout}>
                        <AppInput type="text" id="name" name="name" label="Nome" value={editWorkout.name} onChange={handleChange} />
                        <AppTextarea type="text" id="description" name="description" label="Descrizione" value={editWorkout.description} onChange={handleChange} />
                        <AppInput type="date" id="date" name="date" label="Data" value={editWorkout.date} onChange={handleChange} />
                        <AppInput type="time" id="time" name="time" label="Ora" value={editWorkout.time} onChange={handleChange} />
                        <AppInput type="text" id="place_city" name="place_city" label="Città" value={editWorkout.place_city} onChange={handleChange} />
                        <AppInput type="text" id="place_address" name="place_address" label="Indirizzo" value={editWorkout.place_address} onChange={handleChange} />
                        <AppInput type="number" id="buffer_time" name="buffer_time" label="Tempo di attesa" value={editWorkout.buffer_time} onChange={handleChange} />
                        <AppInput type="number" id="distance" name="distance" label="Distanza" value={editWorkout.distance} onChange={handleChange} />
                        <AppInput type="number" id="pace_m" name="pace_m" min="0" max="59" label="passo" value={editWorkout.pace_m} onChange={handleChange} />
                        <AppInput type="number" id="pace_s" name="pace_s" min="0" max="59" value={editWorkout.pace_s} onChange={handleChange} />
                        <AppButton type="submit">Modifica</AppButton>
                    </form>

                    <AppLink to="/workouts">Tutti gli allenamenti</AppLink>
                </div>
            }
        </>
    );

}