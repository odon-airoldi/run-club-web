
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import AppLinkArrowLeft from "../components/AppLinkArrowLeft";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import axios from "axios";


export default function UserEditPage() {

    const navigate = useNavigate();
    const { userAuth } = useAuth();
    const { id } = useParams();
    const { user, showUser, loading } = useUser();
    const [editUser, setEditUser] = useState(null);

    const [pictureFile, setPictureFile] = useState(null); // file selezionato
    const [picturePreview, setPicturePreview] = useState(null); // anteprima immagine selezionata

    useEffect(() => {

        showUser(id);

    }, [id]);


    useEffect(() => {

        if (loading) return;

        setEditUser(user);

    }, [user, loading]);

    console.log(user)

    async function handleSubmitUser(e) {

        e.preventDefault()

        try {

            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('first_name', editUser.first_name);
            formData.append('last_name', editUser.last_name);
            formData.append('email', editUser.email);


            if (pictureFile) {
                formData.append('picture', pictureFile);
            }

            const response = await axios.post(`http://api.run-club.test/api/users/${id}/edit`,

                formData,

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

        if (e.target.name === 'picture') {
            // se name è picture

            const file = e.target.files[0];
            // recupera il file selezionato (files è una FileList, quindi [0] prende il primo e unico file)

            setPictureFile(file);
            // salva l'oggetto File nello stato dedicato per essere poi incluso nel FormData

            setPicturePreview(file ? URL.createObjectURL(file) : null);
            // se è stato selezionato un file genera un URL temporaneo per mostrare l'anteprima

            return;
        }

        setEditUser({
            ...editUser,
            [e.target.name]: e.target.value,
        });
    }

    function handleRemovePicture() {
        setEditUser({
            ...editUser,
            picture: null
        })
        setPicturePreview(null)
        setPictureFile(null)
    }

    if (loading || !user) {
        return null;
    }

    // redirect se l'utente non è autenticato, oppure se non è admin e non è il proprietario di questo profilo
    if (!userAuth || (userAuth.role !== 'admin' && userAuth.id !== user?.id)) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="">
            {editUser &&
                <div className="w-120 mx-auto">
                    <h1 className="text-4xl font-semibold font-zalando text-indigo-600 mb-4 text-center">Aggiorna il profilo</h1>
                    <form onSubmit={handleSubmitUser} className="grid grid-cols-4 gap-4">
                        <div className="col-span-4 flex flex-col items-center gap-2">
                            {(picturePreview || editUser.picture)
                                ? <img className="h-30 w-30 object-cover rounded-full" src={picturePreview || editUser.picture} />
                                : <div className="h-30 w-30 bg-mauve-200 text-4xl rounded-full text-white flex items-center justify-center">
                                    {user.first_name.slice(0, 1)}
                                    {user.last_name.slice(0, 1)}
                                </div>
                            }
                            <div className="flex gap-2">
                                <label htmlFor="picture" className="block uppercase text-xs text-mauve-400 mb-1 cursor-pointer">
                                    {(picturePreview || editUser.picture) ? 'Modifica' : 'Aggiungi immagine'}
                                </label>
                                <input type="file" id="picture" name="picture" onChange={handleChange} className="hidden" />
                                {(picturePreview || editUser.picture) &&
                                    <button onClick={() => handleRemovePicture()} type="button" className="block uppercase text-xs text-mauve-400 cursor-pointer">Rimuovi</button>
                                }
                            </div>
                        </div>
                        <div className="col-span-4">
                            <AppInput type="text" id="first_name" name="first_name" label="Nome" value={editUser.first_name} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppInput type="text" id="last_name" name="last_name" label="Cognome" value={editUser.last_name} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppInput type="text" id="email" name="email" label="Email" value={editUser.email} onChange={handleChange} />
                        </div>
                        <div className="col-span-4">
                            <AppButton type="submit" className="w-full">Modifica</AppButton>
                        </div>
                        <div className="col-span-4">
                            <AppLinkArrowLeft to={`/user/${id}`}>Torna al profilo</AppLinkArrowLeft>
                        </div>
                    </form>
                </div >
            }
        </div >
    );

}