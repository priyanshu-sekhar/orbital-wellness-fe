import DashboardContainer from "@/containers/DashboardContainer";
import React from "react";
import "../app/globals.css";

const Home: React.FC = () => {
    return (
        <div className={"bg-white"}>
            <div className={"container mx-auto m-4 space-y-4 p-4"}>
                <DashboardContainer/>
            </div>
        </div>
    );
}

export default Home;