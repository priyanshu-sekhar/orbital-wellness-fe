import DashboardContainer from "@/containers/DashboardContainer";
import React from "react";
import "@/app/globals.css";
import useFetchUsageData from "@/hooks/useFetchUsageData";

const Home: React.FC = () => {
    const {usageData, isLoading} = useFetchUsageData();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className={"bg-white"}>
            <div className={"container mx-auto m-4 space-y-4 p-4"}>
                <DashboardContainer usageData={usageData}/>
            </div>
        </div>
    );
}

export default Home;