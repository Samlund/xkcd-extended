import Navbar from "@/components/layout/Navbar.jsx";
import {Outlet} from "react-router";

function Layout() {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout;