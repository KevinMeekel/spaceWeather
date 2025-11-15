export interface GeomagneticStorm {
    activityID: string;
    beginTime: string;
    endTime: string;
    note?: string;
    source?: string;
    [key: string]: any;
}

const apiKey = "DEMO_KEY";

function getDateRange(daysAgo: number): { start: string; end: string } {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - daysAgo);
    return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
    };
}

export async function fetchGST(daysAgo = 7): Promise<GeomagneticStorm[]> {
    const { start, end } = getDateRange(daysAgo);
    const url = `https://api.nasa.gov/DONKI/GST?startDate=${start}&endDate=${end}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data: GeomagneticStorm[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching GST data:", error);
        return [];
    }
}
