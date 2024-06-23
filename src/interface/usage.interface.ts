export interface UsageData {
    message_id: string;
    timestamp: string;
    report_name: string;
    credits_used: number;
}

export interface DailyUsageData {
    date: string;
    credits_used: number;
}