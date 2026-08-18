import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppHeader() {

    const { userAuth, logoutAuth } = useAuth();

    // console.log(user)

    return (
        <header>
            {userAuth?.role == 'admin' &&
                <div className="bg-indigo-900">
                    <ul className="flex">
                        <li className="p-2 text-white">Ciao Admin</li>
                        <li className="p-2 text-white"><Link to="/users">Users</Link></li>
                    </ul>
                </div>
            }

            <ul className="flex">
                <li className="p-4"><Link to="/">Home</Link></li>
                <li className="p-4"><Link to="/workouts">Allenamenti</Link></li>
                <li className="p-4">
                    {userAuth ? <div>Ciao {userAuth.name} <Link onClick={logoutAuth}>Logout</Link></div> : <Link to="/login">Login</Link>}
                </li>
                {userAuth && <li className="p-4"><Link to={`/users/${userAuth.id}`}>Profilo</Link></li>}

            </ul>
        </header>
    )


} 