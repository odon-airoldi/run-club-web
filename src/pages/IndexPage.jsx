import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppLink from "../components/AppLink";

export default function IndexPage() {

    const { userAuth } = useAuth();

    return (
        <div className="">
            <div className="text-center mb-8">
                <h1 className="font-semibold text-6xl font-zalando text-indigo-600">Allenati con altri runner pronti a condividere la tua motivazione</h1>
            </div>

            {!userAuth &&
                <div className="flex flex-col items-center">
                    <div className="mb-4"><AppLink to="/register">Registrati</AppLink></div>
                    <p className="text-center text-sm/6 text-gray-500">Sei già membro? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Accedi</Link></p>

                </div>
            }
        </div >
    );


}