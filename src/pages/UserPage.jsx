
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useWorkout } from "../contexts/WorkoutContext";
import AppWorkoutCard from "../components/AppWorkoutCard";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButtton";

export default function UserPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { userAuth, setUserAuth, logoutAuth } = useAuth();
    const { user, workouts, setWorkouts, runsWorkouts, showUser, userWorkouts, userRunsWorkouts } = useUser();
    const { sortedWorkouts } = useWorkout();

    // console.log(user)

    useEffect(() => {

        showUser(id);
        userWorkouts(id);
        userRunsWorkouts(id);

    }, [id])


    // user elimina account
    async function handleDeleteUser() {

        try {
            const response = await axios.delete(`http://api.run-club.test/api/users/${id}`,
                {
                    withCredentials: true,
                    withXSRFToken: true,
                    headers: {
                        Accept: 'application/json'
                    }
                }
            )

            if (userAuth.id === user.id) {
                setUserAuth(null)
            }

            navigate('/');

        } catch (error) {
            console.log(error.response)
        }

    }


    // se user non è autenticato redirect
    if (!userAuth) return <Navigate to="/" replace />

    if (user && workouts && runsWorkouts)

        return (
            <div className="">
                <h1 className="font-bold text-8xl">{user.name}</h1>

                <h2 className="font-bold text-xl">I miei allenamenti</h2>

                <div className="grid grid-cols-4 gap-4">
                    {
                        sortedWorkouts(workouts).map((workout) => (
                            <AppWorkoutCard key={workout.id} workout={workout} />
                        ))
                    }
                </div>


                {   // se user autenticato è uguale a user in pagina
                    userAuth.id === user.id &&
                    <AppLink to="/workout/create">Aggiungi un allenamento</AppLink>
                }

                <h2 className="font-bold text-xl">Allenamenti a cui hai partecipato</h2>
                <div className="grid grid-cols-4 gap-4">
                    {
                        sortedWorkouts(runsWorkouts).map((workout) => (
                            <AppWorkoutCard key={workout.id} workout={workout} />
                        ))
                    }
                </div>

                <div>
                    <AppButton onClick={logoutAuth}>Logout</AppButton>
                    <AppButton onClick={handleDeleteUser}>Elimina account</AppButton>
                </div>
            </div >
        );


}