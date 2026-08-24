import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function IndexPage() {

    const { userAuth } = useAuth();

    return (
        <div className="p-4">
            <h1 className="font-semibold text-8xl mb-4 font-zalando text-indigo-800">Run Club</h1>

            {!userAuth &&
                <div>
                    <div>Sei già membro? <Link to="/login">Accedi</Link></div>
                    <div>oppure <Link to="/register">iscriviti</Link></div>
                </div>
            }
        </div>
    );


}