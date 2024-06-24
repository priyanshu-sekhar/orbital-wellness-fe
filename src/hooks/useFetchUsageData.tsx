import {UsageData} from "@/interface/usage.interface";
import {useEffect, useState} from "react";
import {formatTimestamp} from "@/helpers/helpers";

const useFetchUsageData = () => {
    const [usageData, setUsageData] = useState<UsageData[]>([]);

    useEffect(() => {
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

        fetchUsageData();
    }, []);

    return usageData;
}

export default useFetchUsageData;