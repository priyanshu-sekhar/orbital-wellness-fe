import {act, renderHook} from "@testing-library/react";
import useFetchUsageData from "@/hooks/useFetchUsageData";
import {UsageData} from "@/interface/usage.interface";

// Mocking the fetch function globally
global.fetch = jest.fn();

describe('useFetchUsageData', () => {
    it('returns usage data when fetch is successful', async () => {
        const mockData: UsageData[] = [
            { message_id: 1, timestamp: '2022-01-01T00:00:00Z', report_name: 'report1', credits_used: 10.292 },
        ];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ usage: mockData }),
        });

        let result;
        await act(async () => {
            result = renderHook(() => useFetchUsageData()).result;
        });

        const formattedData = mockData.map((item) => ({
            ...item,
            timestamp: '2022-01-01 00:00',
            credits_used: 10.29,
        }));
        // @ts-ignore
        expect(result.current).toEqual(formattedData);
    });

    it('returns an empty array when fetch fails', async () => {
        (fetch as jest.Mock).mockReturnValue(new Error('Failed to fetch'));

        const { result } = renderHook(() => useFetchUsageData());

        // @ts-ignore
        expect(result.current).toEqual([]);
    });
});