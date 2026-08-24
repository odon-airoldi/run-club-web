import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppHeader() {

    const { userAuth, logoutAuth } = useAuth();

    // console.log(user)

    return (
        <header className="">

            {userAuth?.role == 'admin' &&
                <div className="px-12 py-2 bg-indigo-900">
                    <ul className="flex gap-8 uppercase text-xs tracking-widest">
                        <li className="text-white">Ciao Admin</li>
                        <li className="text-white"><Link to="/users">Users</Link></li>
                    </ul>
                </div>
            }

            <div className="px-12 py-6">
                <ul className="flex gap-12 font-zalando font-semibold uppercase- text-lg tracking-wide text-mauve-500">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/workouts">Allenamenti</Link></li>
                    <li>
                        {userAuth ? <div>Ciao {userAuth.name} <Link onClick={logoutAuth}>Logout</Link></div> : <Link to="/login">Login</Link>}
                    </li>
                    {userAuth && <li className=""><Link to={`/users/${userAuth.id}`}>Profilo</Link></li>}
                </ul>
            </div>
        </header>
    )


} 