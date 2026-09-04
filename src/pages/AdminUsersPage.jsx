import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import AppButton from "../components/AppButton";
import AppUserPicture from "../components/AppUserPicture";


export default function AdminUsersPage() {

    const navigate = useNavigate()
    const { userAuth, setUserAuth } = useAuth()
    const [users, setUsers] = useState([])
    const [itemSelected, setItemSelected] = useState(null);
    const [openModal, setOpenModal] = useState(null);

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

            setOpenModal(null)
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-indigo-600 font-semibold font-zalando">Runners</h1>
            </div>
            <div className="">
                <div className="grid grid-cols-24 py-2 border-b border-mauve-300 text-xs uppercase text-mauve-400">
                    <div className="col-span-2 sm:col-span-1">ID</div>
                    <div className="col-span-14 sm:col-span-8 lg:col-span-5 ms-12">Nome Cognome</div>
                    <div className="sm:col-span-8 lg:col-span-5 hidden sm:block">Email</div>
                    <div className="col-span-3 hidden sm:block">Registrato</div>
                    <div className="col-span-6 sm:col-span-3 ">Ruolo</div>
                    <div className="col-span-3 hidden lg:block">Allenamenti</div>
                    <div className="col-span-3 hidden lg:block">Partecipazioni</div>
                    <div className="col-span-2 sm:col-span-1"></div>
                </div>
            </div>
            <div className="">
                {
                    users.map((user) => (
                        <div className="grid grid-cols-24 py-3 border-b border-mauve-300 text-sm" key={user.id}>

                            <div className="col-span-2 sm:col-span-1">
                                {user.id}
                            </div>

                            <div className="col-span-14 sm:col-span-8 lg:col-span-5" >
                                <Link to={`/user/${user.id}`} className="flex gap-4">
                                    <AppUserPicture user={user} className="w-8 h-8 -mt-1 -mb-1" />
                                    <div>{user.first_name} {user.last_name}</div>
                                </Link>
                            </div>

                            <div className="sm:col-span-8 lg:col-span-5 hidden sm:block">
                                {user.email}
                            </div>

                            <div className="col-span-3 hidden sm:block">
                                {new Date(user.created_at).toLocaleDateString('it-IT', {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: '2-digit'
                                })}
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                {user.role}
                            </div>

                            <div className="col-span-3 hidden lg:block">
                                {user.workouts.length}
                            </div>

                            <div className="col-span-3 hidden lg:block">
                                {user.runs_workouts.length}
                            </div>

                            <div className="col-span-2 sm:col-span-1 flex justify-center items-center relative">
                                <button onClick={() => setItemSelected(user.id)} className="cursor-pointer block">
                                    <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
                                </button>

                                {itemSelected === user.id &&
                                    <div className="absolute z-1 top-0 right-4 pt-4 pe-8 pb-6 ps-4 bg-mauve-200">
                                        <ul className="flex flex-col gap-1">
                                            <li><Link to={`/user/${itemSelected}`}>Visualizza</Link></li>
                                            <li><Link to={`/user/${itemSelected}/edit`}>Modifica</Link></li>
                                            <li><button onClick={() => setOpenModal(itemSelected)} className="cursor-pointer">Elimina</button></li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            {openModal &&
                <div onClick={() => { setItemSelected(null); setOpenModal(null) }} className="fixed z-2 inset-0 bg-mauve-200/50 backdrop-blur-xs flex items-center justify-center">
                    <AppButton onClick={() => handleDeleteUser(itemSelected)}>Vuoi eliminare definitivamente l'utente?</AppButton>
                </div >
            }
        </div>
    );


}