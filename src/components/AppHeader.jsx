import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppHeader() {

    const { userAuth } = useAuth();

    // console.log(user)

    return (
        <header className="">

            {userAuth?.role === 'admin' &&
                <div className="px-12 py-2 bg-mauve-400">
                    <ul className="flex gap-8 uppercase text-xs tracking-widest">
                        <li className="text-white">Ciao Admin</li>
                        <li className="text-white"><Link to="/admin/users">Runners</Link></li>
                        <li className="text-white"><Link to="/admin/workouts">Allenamenti</Link></li>
                    </ul>
                </div>
            }

            <div className="px-12 py-6 flex justify-between">
                <ul className="flex gap-12 font-zalando font-semibold uppercase- text-lg tracking-wide text-mauve-500">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/workouts">Allenamenti</Link></li>
                </ul>
                <ul className="flex gap-12 font-zalando font-semibold uppercase- text-lg tracking-wide text-mauve-500">
                    <li>
                        {userAuth ? <Link to={`/users/${userAuth.id}`}>Ciao {userAuth.name}</Link> : <div><Link to="/login">Accedi</Link></div>}
                    </li>
                </ul>
            </div>
        </header >
    )


} 