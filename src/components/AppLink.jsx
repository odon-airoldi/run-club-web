import { Link } from "react-router-dom";

export default function AppLink({ to, children }) {

    return (
        <Link to={to} className="inline-flex justify-center bg-indigo-600 px-6 py-4 text-md/6 font-zalando font-semibold text-white hover:bg-indigo-500">
            {children}
        </Link>
    )

} 