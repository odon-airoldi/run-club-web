
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AppWorkoutCard from "../components/AppWorkoutCard";

export default function UserPage() {

    const navigate = useNavigate();

    const { userAuth, logoutAuth } = useAuth();

    const { id } = useParams();

    const [user, setUser] = useState(null)

    // user
    async function showUser() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/users/${id}`,
                {
                    withCredentials: true
                }
            )

            setUser(response.data)


        } catch (error) {
            console.log(error)
        }
    }

    console.log(user)

    const [workouts, setWorkouts] = useState([]);
    const [runsWorkouts, setRunsWorkouts] = useState([]);

    // workout di user
    async function userWorkouts() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/user/${id}/workouts`, {
                withCredentials: true
            });
            setWorkouts(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    // workout a cui partecipa
    async function userRunsWorkouts() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/user/${id}/runs/workouts`, {
                withCredentials: true
            });
            setRunsWorkouts(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {

        showUser();
        userWorkouts();
        userRunsWorkouts();

    }, [id])

    // se user non è autenticato redirect
    if (!userAuth) return <Navigate to="/" replace />

    return (
        <>
            <div>
                <h1 className="font-bold text-8xl">{user?.name}</h1>


                <h2 className="font-bold text-xl">I miei allenamenti</h2>
                <Link to="/workout/create">Aggiungi un allenamento</Link>

                <div className="grid grid-cols-4 gap-4">
                    {
                        workouts.map((workout) => (
                            <AppWorkoutCard key={workout.id} workout={workout} />
                        ))
                    }
                </div>

                <h2 className="font-bold text-xl">Allenamenti a cui hai partecipato</h2>
                <div className="grid grid-cols-4 gap-4">
                    {
                        runsWorkouts.map((workout) => (
                            <AppWorkoutCard key={workout.id} workout={workout} />
                        ))
                    }
                </div>
            </div>

        </>
    );


}