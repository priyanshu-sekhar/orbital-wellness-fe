// `DashboardContainer` is a container component that fetches and displays usage data.
// It uses the `useFetchUsageData` hook to fetch the data and passes it to the `BarChart` and `UsageTableContainer` components for display.
// The `BarChart` displays the daily credit usage and the `UsageTableContainer` displays the usage details.
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import SubHeader from "@/components/SubHeader";
import UsageTableContainer from "@/containers/UsageTableContainer";
import Header from "@/components/Header";
import {getDailyUsageData} from "@/helpers/usage";
import {UsageData} from "@/interface/usage.interface";

interface DashboardContainerProps {
    usageData: UsageData[];
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({usageData}) => {
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