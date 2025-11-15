import { fetchGST } from "./api/fetchGST";

(async () => {
    const storms = await fetchGST(7);
    console.log("Geomagnetic Storms:", storms);
})();
