import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { useStateAdminContext } from "../context/AdminContextProvider";
import Sidebar from "./Sidebar";
import Forms from "./Forms";
import DataQuery from "./DataQuery";

const Dashboard = () => {

    const {
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        showMenu,
        setShowMenu,
    } = useStateContext();

    setActiveMenu(false);
    return (
        <div className="flex">
            <Sidebar />
            <div>
                <Forms />
                <DataQuery />
            </div>
        </div>
    )
};

export default Dashboard;