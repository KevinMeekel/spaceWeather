export interface SolarFlare {
    flrID: string;
    beginTime: string;
    peakTime: string;
    endTime: string;
    classType?: string;
    sourceLocation?: string;
    activeRegionNum?: number;
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

export async function fetchFLR(daysAgo = 7): Promise<SolarFlare[]> {
    const { start, end } = getDateRange(daysAgo);
    const url = `https://api.nasa.gov/DONKI/FLR?startDate=${start}&endDate=${end}&api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        const data: SolarFlare[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Solar Flare data:", error);
        return []; // <-- Important! Always return an array
    }
}
