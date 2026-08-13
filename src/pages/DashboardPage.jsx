
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AppWorkoutCard from "../components/AppWorkoutCard";

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user, logoutAuth } = useAuth();

    const [workouts, setWorkouts] = useState([]);
    const [runsWorkouts, setRunsWorkouts] = useState([]);

    async function userWorkouts() {
        try {
            const response = await axios.get(`http://api.run-club.test/api/user/${user.id}/workouts`, {
                withCredentials: true
            });
            setWorkouts(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    async function userRunsWorkouts() {
        try {
            const response = await axios.get('http://api.run-club.test/api/user/runs/workouts', {
                withCredentials: true
            });
            setRunsWorkouts(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        userWorkouts();
        userRunsWorkouts();

    }, [])


    if (!user) return <Navigate to="/" replace />

    return (
        <>
            <div>
                <h1>Dashboard</h1>

                <p>ciao {user.name}</p>
                <button onClick={logoutAuth}>Logout</button>


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