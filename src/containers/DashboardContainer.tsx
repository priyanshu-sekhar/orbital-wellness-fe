import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';
import {DailyUsageData, UsageData} from "@/interface/usage.interface";
import SubHeader from "@/components/SubHeader";
import UsageTableContainer from "@/containers/UsageTableContainer";
import {formatTimestamp} from "@/helpers/helpers";
import Header from "@/components/Header";


const DashboardContainer: React.FC = () => {
    const [usageData, setUsageData] = useState<UsageData[]>([]);

    useEffect(() => {
        fetchUsageData();
    }, []);

    const fetchUsageData = async () => {
        try {
            const response = await fetch('http://localhost:8000/usage');
            if (response.ok) {
                const data = await response.json();
                const usageData = data.usage as UsageData[];
                const formattedUsageData: UsageData[] = usageData.map((item) => ({
                    ...item,
                    timestamp: formatTimestamp(item.timestamp),
                    credits_used: Number(item.credits_used.toFixed(2)),
                }));
                setUsageData(formattedUsageData);
            } else {
                console.error('Failed to fetch usage data');
            }
        } catch (error) {
            console.error('Error fetching usage data:', error);
        }
    };

    const getDailyUsageData = (): DailyUsageData[] => {
        const dailyUsage: { [key: string]: number } = {};
        usageData.forEach((item) => {
            const date = format(parseISO(item.timestamp), 'yyyy-MM-dd');
            dailyUsage[date] = (dailyUsage[date] || 0) + item.credits_used;
        });
        return Object.entries(dailyUsage).map(([date, credits]) => ({ date, credits_used: credits }));
    };

    return (
        <>
            <Header title={"Credit Usage Dashboard"}/>

            <div className={"space-y-4 space-x-4"}>
                <SubHeader title={"Daily Credit Usage"}/>
                <ResponsiveContainer height={400}>
                    <BarChart data={getDailyUsageData()}>
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