
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useWorkout } from "../contexts/WorkoutContext";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import AppButton from "../components/AppButton";
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

    // redirect al render se user non è autenticato oppure se user non è admin e non è proprietario del workout
    if (!userAuth || userAuth.role !== 'admin' && userAuth.id !== workout.user_id) return <Navigate to="/" replace />


    return (
        <div className="">
            {editWorkout &&
                <div className="w-120 mx-auto">
                    <Link to={`/workout/${id}`} className="flex items-center gap-2 text-indigo-600 uppercase font-light text-sm mb-4">
                        <ArrowLeftIcon className="size-4" />
                        <span>Torna all'allenamento</span>
                    </Link>
                    <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-4">Aggiorna l'allenamento</h1>

                    <form onSubmit={handleSubmitWorkout} className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                            <AppInput type="text" id="name" name="name" label="Titolo" value={editWorkout.name} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppTextarea type="text" id="description" name="description" label="Descrizione" value={editWorkout.description} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppInput type="date" id="date" name="date" label="Data" value={editWorkout.date} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <AppInput type="time" id="time" name="time" label="Ora" value={editWorkout.time} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <AppInput type="number" id="buffer_time" name="buffer_time" label="Tempo di attesa" value={editWorkout.buffer_time} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppInput type="text" id="place_city" name="place_city" label="Città" value={editWorkout.place_city} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppInput type="text" id="place_address" name="place_address" label="Indirizzo" value={editWorkout.place_address} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <AppInput type="number" id="distance" name="distance" label="Distanza" value={editWorkout.distance} onChange={handleChange} />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="pace_m" className="block text-xs mb-1 uppercase text-mauve-400 mb-1">Passo</label>
                            <div className="flex items-center gap-1">
                                <div className="flex-1">
                                    <AppInput type="number" id="pace_m" name="pace_m" min="0" max="59" placeholder="Min" value={editWorkout.pace_m} onChange={handleChange} />
                                </div>
                                <div className="text-mauve-00 text-sm">:</div>
                                <div className="flex-1">
                                    <AppInput type="number" id="pace_s" name="pace_s" min="0" max="59" placeholder="Sec" value={editWorkout.pace_s} onChange={handleChange} />
                                </div>
                            </div>
                        </div >
                        <div className="col-span-4">
                            <AppButton type="submit" className="w-full">Aggiorna</AppButton>
                        </div>
                    </form>

                </div>
            }
        </div>
    );

}