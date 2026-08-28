import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import AppButton from "../components/AppButton";


export default function AdminUsersPage() {

    const navigate = useNavigate()
    const { userAuth, setUserAuth } = useAuth()
    const [users, setUsers] = useState([])
    const [itemSelected, setItemSelected] = useState(null);
    const [openModal, setOpenModal] = useState(false);

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

    // user elimina account
    async function handleDeleteUser(id) {

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

            setOpenModal(false)
            setItemSelected(null)
            // aggiorno lo stato di users filtrando l'user eliminato
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))

            if (userAuth.id === id) {
                setUserAuth(null)
            }


        } catch (error) {
            console.log(error.response)
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

            <div className="">
                <div className="grid grid-cols-24 py-2 border-b border-mauve-300 text-xs uppercase text-mauve-400">
                    <div>ID</div>
                    <div className="col-span-5">Nome</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-3">Registrato</div>
                    <div className="col-span-3">Ruolo</div>
                    <div className="col-span-3">Allenamenti</div>
                    <div className="col-span-3">Partecipazioni</div>
                    <div></div>
                </div>
            </div>
            <div className="">
                {
                    users.map((user) => (
                        <div className="grid grid-cols-24 py-2 border-b border-mauve-300 text-sm" key={user.id}>

                            <div>
                                {user.id}
                            </div>

                            <div className="col-span-5">
                                {user.name}
                            </div>

                            <div className="col-span-5">
                                {user.email}
                            </div>

                            <div className="col-span-3">
                                {new Date(user.created_at).toLocaleDateString('it-IT', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: '2-digit'
                                })}
                            </div>

                            <div className="col-span-3">
                                {user.role}
                            </div>

                            <div className="col-span-3">
                                {user.workouts.length}
                            </div>

                            <div className="col-span-3">
                                {user.runs_workouts.length}
                            </div>

                            <div className="flex justify-center items-start relative">
                                <button onClick={() => setItemSelected(user.id)} className="cursor-pointer block">
                                    <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
                                </button>

                                {itemSelected === user.id &&
                                    <div className="absolute z-1 top-0 right-4 rounded-sm pt-4 pe-8 pb-6 ps-4 bg-mauve-200">
                                        <ul className="flex flex-col gap-1">
                                            <li><Link to={`/user/${itemSelected}`}>Visualizza</Link></li>
                                            {/* <li><Link to={`/user/${itemSelected}/edit`}>Modifica</Link></li> */}
                                            <li><button onClick={() => setOpenModal(true)} className="cursor-pointer">Elimina</button></li>
                                        </ul>
                                    </div>
                                }
                                {(openModal && itemSelected === user.id) &&
                                    <div onClick={() => { setItemSelected(null); setOpenModal(false) }} className="fixed z-2 inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center">
                                        <AppButton onClick={() => handleDeleteUser(itemSelected)}>Vuoi eliminare definitivamente l'utente {user.name}?</AppButton>
                                    </div >
                                }

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );


}