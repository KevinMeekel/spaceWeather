import { fetchFLR } from "./api/fetchFLR";

(async () => {
    const flares = await fetchFLR(7); // last 2 days
    console.log("Solar Flares:", flares);
})();
