import { Outlet } from "react-router-dom"
import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"

export default function AppLayout() {

    return (

        <div className="min-h-screen flex flex-col">
            <AppHeader />
            <div className="flex-1 flex flex-col p-4 text-mauve-600">
                <Outlet />
            </div>
            <AppFooter />
        </div>

    )

}