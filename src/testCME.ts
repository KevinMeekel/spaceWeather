import { fetchCME } from "./api/fetchCME";

(async () => {
    const cmes = await fetchCME(7);
    console.log("CMEs:", cmes);
})();
