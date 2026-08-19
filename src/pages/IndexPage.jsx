import { Link } from "react-router-dom";

export default function IndexPage() {

    return (
        <div className="p-4">
            <h1 className="font-bold text-8xl mb-4">RUN CLUB</h1>
            <div>Sei già membro? <Link to="/login">Accedi</Link></div>
            <div>oppure <Link to="/register">iscriviti</Link></div>

        </div>
    );


}