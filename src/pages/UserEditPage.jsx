
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import AppButton from "../components/AppButton";
import AppLink from "../components/AppLink";
import AppInput from "../components/AppInput";
import AppTextarea from "../components/AppTextarea";
import axios from "axios";


export default function UserEditPage() {

    const navigate = useNavigate();

    const { userAuth } = useAuth();

    const { id } = useParams();

    const { user, setUser, showUser, loading } = useUser();

    const [editUser, setEditUser] = useState(null);

    useEffect(() => {

        showUser(id);

    }, [id]);

    useEffect(() => {

        if (loading) return;

        setEditUser(user);

    }, [user]);

    console.log(user)

    async function handleSubmitUser(e) {

        e.preventDefault()

        try {

            const updateUser = {
                name: editUser.name,
                email: editUser.email,
            }

            const response = await axios.put(`http://api.run-club.test/api/users/${id}/edit`,

                updateUser,

                {
                    withCredentials: true,
                    withXSRFToken: true
                }
            )

            navigate(`/user/${response.data.id}`);

        } catch (error) {

            console.error(error.response);

        }

    }

    function handleChange(e) {

        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
        })

    }

    // redirect al render se user non è autenticato oppure se user non è admin e non è proprietario del workout
    if (!userAuth || userAuth.role !== 'admin' && userAuth.id !== user.id) return <Navigate to="/" replace />


    return (
        <div className="">
            {editUser &&
                <div className="w-120 mx-auto">
                    <Link to={`/user/${id}`} className="flex items-center gap-2 text-indigo-600 uppercase font-light text-sm mb-4"><ArrowLeftIcon className="size-4" /><span>Torna al profilo</span></Link>
                    <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-4">Aggiorna il profilo</h1>
                    <form onSubmit={handleSubmitUser} className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                            <AppInput type="text" id="name" name="name" label="Nome" value={editUser.name} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppInput type="text" id="email" name="email" label="Email" value={editUser.email} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppButton type="submit">Modifica</AppButton>
                        </div>
                    </form>
                </div>
            }
        </div>
    );

}