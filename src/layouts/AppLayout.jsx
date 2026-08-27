import { Outlet } from "react-router-dom"
import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"

export default function AppLayout() {

    return (

        <>
            <AppHeader />
            <div className="p-4 text-mauve-600">
                <Outlet />
            </div>
            <AppFooter />
        </>

    )

}