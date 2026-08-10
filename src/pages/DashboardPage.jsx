
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user, loading, logoutAuth } = useAuth();

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
            console.log(response)
        } catch (error) {
            console.log(error.response)
        }
    }


    useEffect(() => {
        console.log('user al momento della chiamata:', user);
        userWorkouts();
        userRunsWorkouts();

    }, [])




    return (
        <>
            <h1>Dashboard</h1>

            {loading && 'Caricamento...'}
            <p>ciao {user.name}</p>
            <button onClick={logoutAuth}>Logout</button>


            <h2 className="font-bold text-xl">I miei allenamenti</h2>
            <Link to="/workout/create">Aggiungi un allenamento</Link>

            <div className="grid grid-cols-4 gap-4">
                {
                    workouts.map((workout) => (
                        <div key={workout.id} className="p-4 border border-gray-200">
                            <Link to={`/workout/${workout.id}`}>{workout.name}</Link>
                        </div>
                    ))
                }
            </div>

            <h2 className="font-bold text-xl">Allenamenti a cui hai partecipato</h2>
            <div className="grid grid-cols-4 gap-4">
                {
                    runsWorkouts.map((workout) => (
                        <div key={workout.id} className="p-4 border border-gray-200">
                            <Link to={`/workout/${workout.id}`}>{workout.name}</Link>
                        </div>
                    ))
                }
            </div>

        </>
    );


}