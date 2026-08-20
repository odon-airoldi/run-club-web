import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function IndexPage() {

    const { userAuth } = useAuth();

    return (
        <div className="p-4">
            <h1 className="font-bold text-8xl mb-4">RUN CLUB</h1>

            {!userAuth &&
                <div>
                    <div>Sei già membro? <Link to="/login">Accedi</Link></div>
                    <div>oppure <Link to="/register">iscriviti</Link></div>
                </div>
            }
        </div>
    );


}