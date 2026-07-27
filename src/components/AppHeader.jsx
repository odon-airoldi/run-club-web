import { Link } from "react-router-dom";

export default function AppHeader() {

    return (
        <header>
            <ul className="flex">
                <li className="p-4"><Link to="/">Allenamenti</Link></li>
                <li className="p-4"><Link to="/login">Login</Link></li>
                <li className="p-4"><Link to="/dashboard">Profilo</Link></li>
            </ul>
        </header>
    )

} 