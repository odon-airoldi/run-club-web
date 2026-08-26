
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButtton";
import AppInput from "../components/AppInput";
import AppTextarea from "../components/AppTextarea";
import axios from "axios";


export default function WorkoutCreatePage() {

    const { userAuth } = useAuth();

    const navigate = useNavigate();

    async function addWorkout(e) {

        e.preventDefault()

        try {

            const newWorkout = {
                name: e.target.name.value,
                description: e.target.description.value,
                date_time: `${e.target.date.value} ${e.target.time.value}:00`,
                place_city: e.target.place_city.value,
                place_address: e.target.place_address.value,
                buffer_time: e.target.buffer_time.value,
                distance: e.target.distance.value,
                pace: Number(e.target.pace_m.value) * 60 + Number(e.target.pace_s.value),
                user_id: userAuth?.id
            }

            const response = await axios.post('http://api.run-club.test/api/workouts',

                newWorkout,

                {
                    withCredentials: true,
                    withXSRFToken: true,
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )

            const workout = response.data;

            navigate(`/workout/${workout.id}`);
            // console.log(response.data);

        } catch (error) {

            console.log(error.response);

        }

    }

    // redirect al render se user non è autenticato
    if (!userAuth) return <Navigate to="/" replace />

    return (
        <div className="w-120 mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-600 uppercase font-light text-sm mb-4"><ArrowLeftIcon className="size-4" /><span>Torna indietro</span></button>
            <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-4">Aggiungi un allenamento</h1>
            <form onSubmit={addWorkout} className="grid grid-cols-4 gap-4">
                <div className="col-span-4">
                    <AppInput type="text" id="name" name="name" label="Nome" />
                </div>
                <div className="col-span-4">
                    <AppTextarea type="text" id="description" name="description" label="Descrizione" />
                </div>
                <div className="col-span-4">
                    <AppInput type="date" id="date" name="date" label="Data" />
                </div>
                <div className="col-span-2">
                    <AppInput type="time" id="time" name="time" label="Ora" />
                </div>
                <div className="col-span-2">
                    <AppInput type="number" id="buffer_time" name="buffer_time" label="Tempo di attesa" />
                </div>
                <div className="col-span-4">
                    <AppInput type="text" id="place_city" name="place_city" label="Città" />
                </div>
                <div className="col-span-4">
                    <AppInput type="text" id="place_address" name="place_address" label="Indirizzo" />
                </div>
                <div className="col-span-2">
                    <AppInput type="number" id="distance" name="distance" label="Distanza" />
                </div>
                <div className="col-span-1">
                    <AppInput type="number" id="pace_m" name="pace_m" min="0" max="59" label="Passo Min" />
                </div>
                <div className="col-span-1">
                    <AppInput type="number" id="pace_s" name="pace_s" min="0" max="59" label="Passo Sec" />
                </div>
                <div className="col-span-4">
                    <AppButton type="submit">Aggiungi</AppButton>
                </div>
            </form>
            <AppLink to="/workouts">Tutti gli allenamenti</AppLink>
        </div>
    );

}