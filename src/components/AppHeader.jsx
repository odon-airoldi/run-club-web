import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { PlusIcon, FireIcon } from '@heroicons/react/20/solid'
import AppUserPicture from "../components/AppUserPicture";


export default function AppHeader() {

    const { userAuth } = useAuth();

    // console.log(user)

    return (
        <header className="sticky top-0 backdrop-blur-sm">

            {userAuth?.role === 'admin' &&
                <div className="px-4 md:px-12 py-2 bg-mauve-300/50">
                    <ul className="flex justify-center sm:justify-end gap-4 sm:gap-8 text-xs uppercase tracking-wide">
                        <li className="">Ciao Admin</li>
                        <li className=""><Link to="/admin/users">Runners</Link></li>
                        <li className=""><Link to="/admin/workouts">Allenamenti</Link></li>
                    </ul>
                </div>
            }

            <div className="px-4 md:px-12 py-6 md:py-8 flex items-center relative font-zalando font-bold uppercase bg-white/50">
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-xl sm:text-3xl tracking-tight text-indigo-600">Run Club</Link>
                <ul className="w-full flex justify-between items-center text-lg text-mauve-500">
                    <li>
                        <Link to="/workouts" className="flex items-center gap-4">
                            <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                <FireIcon className="size-5" />
                            </span>
                            <span className="hidden lg:block">Allenamenti</span>
                        </Link>
                    </li>
                    {userAuth ?
                        <ul className="flex gap-2 sm:gap-4">
                            <li>
                                <Link to={`/user/${userAuth.id}`} className="flex items-center gap-4">
                                    <div className="hidden lg:block">{userAuth.first_name} {userAuth.last_name}</div>
                                    <AppUserPicture user={userAuth} className="w-8 h-8 font-normal text-sm" />
                                </Link>
                            </li>
                            <li>
                                <Link role="tab" to="/workout/create" className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                    <PlusIcon className="size-5" />
                                </Link>
                            </li>
                        </ul>
                        : <li><Link to="/login">Accedi</Link></li>}

                </ul>
            </div>
        </header >
    )


} 