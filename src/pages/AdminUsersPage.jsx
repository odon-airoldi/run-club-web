import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function AdminUsersPage() {

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
            <div className="text-center mb-8">
                <h1 className="font-semibold text-6xl font-zalando text-indigo-600">Runners</h1>
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-200 text-xs uppercase text-mauve-400">
                    <div>ID</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-2">Ruolo</div>
                    <div className="col-span-2">Allenamenti creati</div>
                    <div className="col-span-2">Partecipazioni</div>
                    <div>Modifica</div>
                    <div>Elimina</div>
                </div>
                {
                    users.map((user) => (
                        <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-200 text-sm" key={user.id}>
                            <div>
                                {user.id}
                            </div>
                            <div className="col-span-3">
                                <Link className="text-indigo-600 font-zalando font-semibold" to={`/users/${user.id}`}>{user.name}</Link>
                            </div>
                            <div className="col-span-2">
                                {user.role}
                            </div>
                            <div className="col-span-2">
                                {user.workouts.length}
                            </div>
                            <div>
                                {user.runs_workouts.length}
                            </div>
                            <div>

                            </div>
                            <div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );


}