import { parseISO, format } from 'date-fns';
import { DailyUsageData, UsageData } from "@/interface/usage.interface";

export const getDailyUsageData = (usageData: UsageData[]): DailyUsageData[] => {
    const dailyUsage: { [key: string]: number } = {};
    usageData.forEach((item) => {
        const date = format(parseISO(item.timestamp), 'yyyy-MM-dd');
        dailyUsage[date] = (dailyUsage[date] || 0) + item.credits_used;
    });
    return Object.entries(dailyUsage).map(([date, credits]) => ({ date, credits_used: credits }));
};