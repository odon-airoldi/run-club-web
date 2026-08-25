import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

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


    if (!userAuth || userAuth.role !== 'admin') return <Navigate to="/" replace />

    return (
        <div className="">

            <h1 className="font-semibold text-8xl mb-4 font-zalando text-indigo-600">Users List</h1>

            <div className="flex flex-col">
                <div className="grid grid-cols-9 gap-4 py-2 border-b border-gray-200 text-xs uppercase text-mauve-400">
                    <div>ID</div>
                    <div className="col-span-2">Nome</div>
                    <div className="col-span-2">Ruolo</div>
                    <div className="col-span-2">Allenamenti creati</div>
                    <div className="col-span-2">Allenamenti a cui si è unito</div>
                </div>
                {
                    users.map((user) => (
                        <div className="grid grid-cols-9 gap-4 py-2 border-b border-gray-200 text-sm text-mauve-600" key={user.id}>
                            <div>
                                {user.id}
                            </div>
                            <div className="col-span-2">
                                <Link className="text-indigo-600" to={`/users/${user.id}`}>{user.name}</Link>
                            </div>
                            <div className="col-span-2">
                                {user.role}
                            </div>
                            <div className="col-span-2">
                                {user.workouts.length}
                                {/* {user.workouts.map((workout) => (
                                        <span key={workout.id}>{workout.id}</span>
                                    ))} */}
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
    );


}