import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function UsersPage() {

    const navigate = useNavigate()
    const { userAuth } = useAuth()
    const [users, setUsers] = useState([])

    async function indexUsers() {
        try {
            const response = await axios.get('http://api.run-club.test/api/users',
                {
                    withCredentials: true
                }
            )

            setUsers(response.data)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        indexUsers()

    }, [])

    console.log(users)

    if (!userAuth || userAuth.role !== 'admin') return <Navigate to="/" replace />


    return (
        <>
            <div className="p-4">
                <h1 className="font-bold text-8xl">Users List</h1>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-5 gap-4 border-b border-gray-200">
                        <div>ID</div>
                        <div>Nome</div>
                        <div>Ruolo</div>
                        <div>Allenamenti creati</div>
                        <div>Allenamenti a cui si è unito</div>
                    </div>
                    {
                        users.map((user) => (
                            <div className="grid grid-cols-5 gap-4 border-b border-gray-200" key={user.id}>
                                <div>
                                    {user.id}
                                </div>
                                <div>
                                    {user.name}
                                </div>
                                <div>
                                    {user.role}
                                </div>
                                <div>
                                    {/* {user.workouts.map((workout) => (
                                        <span key={workout.id}>{workout.id}</span>
                                    ))} */}
                                    {user.workouts.length}
                                </div>
                                <div>
                                    {user.runs_workouts.length}
                                    {/* {user.runs_workouts.map((workout) => (
                                        <span key={workout.id}>{workout.id}</span>
                                    ))} */}
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>
        </>
    );


}