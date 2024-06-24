import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SubHeader from "@/components/SubHeader";
import UsageTableContainer from "@/containers/UsageTableContainer";
import Header from "@/components/Header";
import useFetchUsageData from "@/hooks/useFetchUsageData";
import {getDailyUsageData} from "@/helpers/usage";


const DashboardContainer: React.FC = () => {
    const usageData = useFetchUsageData();

    return (
        <>
            <Header title={"Credit Usage Dashboard"}/>

            <div className={"space-y-4 space-x-4"}>
                <SubHeader title={"Daily Credit Usage"}/>
                <ResponsiveContainer height={400}>
                    <BarChart data={getDailyUsageData(usageData)}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="credits_used" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className={"space-y-4"}>
                <SubHeader title={"Usage Details"}/>
                <UsageTableContainer
                    rows={usageData}
                />
            </div>
        </>
    );
};

export default DashboardContainer;