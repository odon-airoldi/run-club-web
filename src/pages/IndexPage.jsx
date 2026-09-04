import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppLink from "../components/AppLink";

export default function IndexPage() {

    const { userAuth } = useAuth();

    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="md:w-2/3 lg:w-1/2 text-center">
                <h1 className="mb-8 font-semibold text-4xl md:text-6xl font-zalando text-indigo-600">
                    Allenati con altri runner pronti a condividere la tua motivazione
                </h1>

                {!userAuth &&
                    <>
                        <AppLink to="/register">Registrati</AppLink>
                        <p className="text-sm mt-8">Sei già membro? <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Accedi</Link></p>
                    </>
                }
            </div >
        </div >
    );


}