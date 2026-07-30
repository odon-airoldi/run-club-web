
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {

    const navigate = useNavigate();

    const { user, loading, logoutAuth } = useAuth();

    const [userWorkouts, setUserWorkouts] = useState([]);


    useEffect(() => {

        async function getUserWorkouts() {

            try {
                const response = await axios.get(`http://api.run-club.test/api/user/${user.id}/workouts`, {
                    withCredentials: true
                });
                setUserWorkouts(response.data)
            } catch (error) {
                console.log(error.response)
            } finally {
            }

        }

        getUserWorkouts();

    }, [user])



    return (
        <>
            <h1>Dashboard</h1>

            {loading && 'Sto caricandoooooooooooooo'}
            <p>ciao {user && user.name}</p><button onClick={logoutAuth}>Logout</button>


            <h2 className="font-bold text-xl">I miei allenamenti</h2>
            <div className="grid grid-cols-4 gap-4">
                {
                    userWorkouts.map((workout) => (
                        <div key={workout.id} className="p-4 border border-gray-200">
                            <Link to={`/workout/${workout.id}`}>{workout.name}</Link>
                        </div>
                    ))
                }
            </div>

            <h2 className="font-bold text-xl">Allenamenti a cui hai partecipato</h2>

        </>
    );


}