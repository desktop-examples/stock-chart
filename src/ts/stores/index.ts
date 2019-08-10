import { CryptoCompareHistoricalPriceStore } from "./pricing/cryptoCompareHistoricalPriceStore";
import { ServiceWorkerStore } from "./service-worker/serviceWorkerStore";
import { WindowStore } from "./window/windowStore";

export const stores = {
    historicalPriceStore: new CryptoCompareHistoricalPriceStore(),
    serviceWorkerStore: new ServiceWorkerStore(),
    windowStore: new WindowStore(),
};
