import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppLink from "../components/AppLink";

export default function IndexPage() {

    const { userAuth } = useAuth();

    return (
        <div className="">
            <h1 className="font-semibold text-8xl mb-4 font-zalando text-indigo-600">Run Club</h1>

            {!userAuth &&
                <div>
                    <div>Sei già membro? <AppLink to="/login">Accedi</AppLink></div>
                    <div>oppure <AppLink to="/register">iscriviti</AppLink></div>
                </div>
            }
        </div>
    );


}