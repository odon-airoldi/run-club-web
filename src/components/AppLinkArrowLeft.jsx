import { Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function AppLinkArrowLeft({ to, children }) {

    return (
        <Link to={to} className="inline-flex gap-1.5 border border-indigo-600 text-xs ps-3 pe-4 py-2 uppercase text-indigo-600 cursor-pointer">
            <ArrowLeftIcon className="size-4" />
            <span>{children}</span>
        </Link>
    )

} 