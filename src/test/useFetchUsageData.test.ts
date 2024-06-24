import {renderHook} from "@testing-library/react";
import useFetchUsageData from "@/hooks/useFetchUsageData";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe('useFetchUsageData', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('returns usage data when fetch is successful', async () => {
        const mockData = [
            { timestamp: '2022-01-01T00:00:00Z', credits_used: 10 },
            { timestamp: '2022-01-02T00:00:00Z', credits_used: 20 },
        ];
        fetchMock.mockResponseOnce(JSON.stringify({ usage: mockData }));

        const { result } = renderHook(() => useFetchUsageData());

        // @ts-ignore
        expect(result.current).toEqual([
            { timestamp: '2022-01-01', credits_used: 10 },
            { timestamp: '2022-01-02', credits_used: 20 },
        ]);
    });

    it('returns an empty array when fetch fails', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        const { result } = renderHook(() => useFetchUsageData());

        // @ts-ignore
        expect(result.current).toEqual([]);
    });
});