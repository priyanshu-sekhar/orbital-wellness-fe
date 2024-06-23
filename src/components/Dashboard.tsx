import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO, format } from 'date-fns';
import {DailyUsageData, UsageData} from "@/interface/usage.interface";
import {Grid} from "@mui/material";
import SortableUsageTable from "@/components/tables/SortableUsageTable";
import {Box} from "@mui/system";
import Header from "@/components/Header";


const Dashboard: React.FC = () => {
    const [usageData, setUsageData] = useState<UsageData[]>([]);

    useEffect(() => {
        fetchUsageData();
    }, []);

    const fetchUsageData = async () => {
        try {
            const response = await fetch('http://localhost:8000/usage');
            if (response.ok) {
                const data = await response.json();
                setUsageData(data.usage);
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
        <Grid container margin={1} spacing={1} md={11} alignItems={"center"}>
            <h1 className="text-3xl font-bold mb-4">Credit Usage Dashboard</h1>

            <Grid item container>
                <Header title={"Daily Credit Usage"}/>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getDailyUsageData()}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        {/*<Tooltip />*/}
                        <Bar dataKey="credits_used" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>

            <Grid item container>
                <Header title={"Usage Details"}/>
                <SortableUsageTable
                    rows={usageData}
                />
            </Grid>
        </Grid>
    );
};

export default Dashboard;