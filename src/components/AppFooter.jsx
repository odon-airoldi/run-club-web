import { Link } from "react-router-dom";

export default function AppFooter() {

    const year = new Date().getFullYear()

    return (
        <footer className="p-4 text-xs text-mauve-400 uppercase text-center">
            Run Club &copy; {year}
        </footer>
    )


} 