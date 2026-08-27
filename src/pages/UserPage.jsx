
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

    const [openModal, setOpenModal] = useState(false);

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
                {   // se user autenticato è uguale a user in pagina
                    userAuth.id === user.id &&
                    <AppLink to="/workout/create">Aggiungi un allenamento</AppLink>
                }

                <div className="">
                    <h1 className="font-semibold text-8xl font-zalando text-indigo-600">{user.name}</h1>
                </div>

                <div className="flex justify-center">
                    <div className="text-center">
                        <h2 className="font-semibold text-2xl uppercase text-indigo-600">Allenamenti creati <span className="">{workouts.length}</span></h2>
                    </div>
                    <div className="text-center">
                        <h2 className="font-semibold text-2xl uppercase text-indigo-600">Partecipazioni<span>{runsWorkouts.length}</span></h2>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            sortedWorkouts(workouts).map((workout) => (
                                <AppWorkoutCard key={workout.id} workout={workout} />
                            ))
                        }
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            sortedWorkouts(runsWorkouts).map((workout) => (
                                <AppWorkoutCard key={workout.id} workout={workout} />
                            ))
                        }
                    </div>
                </div>


                <div className="flex gap-1">
                    <AppButton onClick={logoutAuth}>Logout</AppButton>
                    <AppButton onClick={() => setOpenModal(true)}>Elimina account</AppButton>
                    {openModal &&
                        <div className="fixed inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center" onClick={() => setOpenModal(false)}>
                            <AppButton onClick={handleDeleteUser}>Vuoi eliminare definitivamente il tuo account?</AppButton>
                        </div >
                    }
                </div>
            </div >
        );


}