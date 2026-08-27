
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useWorkout } from "../contexts/WorkoutContext";
import { PlusIcon } from '@heroicons/react/24/solid'
import AppWorkoutCard from "../components/AppWorkoutCard";
import AppLink from "../components/AppLink";
import AppButton from "../components/AppButtton";
import axios from "axios";


export default function UserPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { userAuth, setUserAuth, logoutAuth } = useAuth();
    const { user, workouts, setWorkouts, runsWorkouts, showUser, userWorkouts, userRunsWorkouts } = useUser();
    const { sortedWorkouts } = useWorkout();

    const [openModal, setOpenModal] = useState(false);
    const [tab, setTab] = useState(1)

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
                <div className="text-center mb-8">
                    <h1 className="font-semibold text-6xl font-zalando text-indigo-600">{user.name}</h1>
                </div>

                <div role="tablist" className="flex justify-center gap-8 text-md text-mauve-400">
                    <button role="tab" onClick={() => setTab(1)} className={`flex gap-2 items-center py-4 uppercase font-light tracking-wide border-b -mb-[1px] cursor-pointer ${tab === 1 ? 'border-indigo-600' : 'border-transparent'}`}>
                        Allenamenti creati <span className="w-[24px] aspect-square rounded-full bg-mauve-400 flex items-center justify-center text-white text-xs">{workouts.length}</span>

                    </button>
                    <button role="tab" onClick={() => setTab(2)} className={`flex gap-2 items-center py-4 uppercase font-light tracking-wide border-b -mb-[1px] cursor-pointer ${tab === 2 ? 'border-indigo-600' : 'border-transparent'}`}>
                        Partecipazioni <span className="w-[24px] aspect-square rounded-full bg-mauve-400 flex items-center justify-center text-white text-xs">{runsWorkouts.length}</span>
                    </button>
                    {   // se user autenticato è uguale a user in pagina
                        userAuth.id === user.id &&
                        <Link role="tab" to="/workout/create" className={`flex gap-2 items-center py-4 uppercase font-light tracking-wide border-b border-transparent -mb-[1px]`}>
                            Crea allenamento <span className="w-[24px] aspect-square rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs"><PlusIcon className="size-4" /></span>
                        </Link>
                    }
                </div>


                <div className="pt-8 pb-16 border-y border-mauve-300">
                    <div role="tabpanel" className="grid grid-cols-4 gap-4">
                        {tab === 1 && (
                            workouts.length > 0 ?
                                sortedWorkouts(workouts).map((workout) => (
                                    <AppWorkoutCard key={workout.id} workout={workout} />
                                )) : <div className="col-span-4 pt-8 text-lg text-mauve-400 font-zalando text-center">Nessun allenamento</div>
                        )}

                        {tab === 2 && (
                            runsWorkouts.length > 0 ?
                                sortedWorkouts(runsWorkouts).map((workout) => (
                                    <AppWorkoutCard key={workout.id} workout={workout} />
                                )) : <div className="col-span-4 pt-8 text-lg text-mauve-400 font-zalando text-center">Nessun allenamento</div>
                        )}
                    </div>
                </div>


                <div className="flex justify-end gap-2 py-4">

                    { // se user è nel suo profilo
                        (userAuth?.id === user.id) &&
                        <button onClick={logoutAuth} className="border border-mauve-300 text-xs px-4 py-2 uppercase text-mauve-400 cursor-pointer">Logout</button>
                    }

                    { // se user è nel suo profilo o è admin
                        (userAuth?.id === user.id || userAuth?.role === 'admin') &&
                        <button onClick={() => setOpenModal(true)} className=" border border-mauve-300 text-xs px-4 py-2 uppercase text-mauve-400 cursor-pointer">Elimina account</button>
                    }
                </div>

                {openModal &&
                    <div className="fixed inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center" onClick={() => setOpenModal(false)}>
                        <div className="text-center">
                            <p className="text-lg font-zalando mb-4">
                                Vuoi eliminare definitivamente {userAuth?.id === user.id ? ' il tuo account?' : `l\'account di ${user.name}`}</p>
                            <AppButton onClick={handleDeleteUser}>Elimina</AppButton>
                        </div>
                    </div >
                }
            </div>

        );


}