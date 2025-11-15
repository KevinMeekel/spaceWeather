import { promises as fs } from "fs";
import path from "path";
import { fetchFLR, SolarFlare } from "./fetchFLR";
import { fetchCME, CoronalMassEjection } from "./fetchCME";
import { fetchGST, GeomagneticStorm } from "./fetchGST";

export interface SpaceWeatherData {
    flares: SolarFlare[];
    cmes: CoronalMassEjection[];
    gsts: GeomagneticStorm[];
}

export async function fetchAndSaveAll(daysAgo = 7): Promise<void> {
    try {
        const [flares, cmes, gsts] = await Promise.all([
            fetchFLR(daysAgo),
            fetchCME(daysAgo),
            fetchGST(daysAgo),
        ]);

        const data: SpaceWeatherData = { flares, cmes, gsts };

        // Ensure data folder exists
        const dataDir = path.resolve(__dirname, "../../public/data");
        await fs.mkdir(dataDir, { recursive: true });

        // Write JSON file
        const filePath = path.join(dataDir, "spaceWeather.json");
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

        console.log(`Space weather data saved to ${filePath}`);
    } catch (error) {
        console.error("Error fetching or saving space weather data:", error);
    }
}

// Run only when executed directly: node fetchAllSpaceWeather.js
if (require.main === module) {
    fetchAndSaveAll(7);
}
