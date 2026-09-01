import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PlusIcon } from '@heroicons/react/24/solid'


export default function AppHeader() {

    const { userAuth } = useAuth();

    // console.log(user)

    return (
        <header className="">

            {userAuth?.role === 'admin' &&
                <div className="px-12 py-2 bg-mauve-200">
                    <ul className="flex justify-end gap-8 text-sm text-mauve-600 tracking-wide">
                        <li className="">Ciao Admin</li>
                        <li className=""><Link to="/admin/users">Runners</Link></li>
                        <li className=""><Link to="/admin/workouts">Allenamenti</Link></li>
                    </ul>
                </div>
            }

            <div className="px-12 py-8 flex justify-between items-center relative font-zalando font-bold uppercase">
                <ul className="flex gap-12 text-lg text-mauve-500">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/workouts">Allenamenti</Link></li>
                </ul>
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-3xl tracking-tight text-indigo-600">Run Club</Link>
                <ul className="flex items-center gap-8 text-lg text-mauve-500">
                    {userAuth
                        ?
                        <>
                            <li><Link to={`/user/${userAuth.id}`}>Ciao {userAuth.name}</Link></li>
                            <li>
                                <Link role="tab" to="/workout/create" className="w-8 aspect-square rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
                                    <PlusIcon className="size-6" />
                                </Link>
                            </li>
                        </>
                        : <li><Link to="/login">Accedi</Link></li>}

                </ul>
            </div>
        </header >
    )


} 