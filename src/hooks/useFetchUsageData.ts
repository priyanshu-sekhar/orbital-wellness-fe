// `useFetchUsageData` is a custom hook for fetching usage data from the backend.
// It uses the Fetch API to get data from the server and stores it in the `usageData` state.
// The data is fetched when the component mounts (due to the empty dependency array in `useEffect`).
// If the fetch is successful, the data is formatted and set in the `usageData` state.
// If the fetch fails, an error message is logged to the console.
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