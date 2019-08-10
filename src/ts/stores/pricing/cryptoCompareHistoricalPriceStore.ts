import * as debug from "debug";
import * as moment from "moment";
import * as qs from "querystring";

import { IHistoricalPriceOptions, IHistoricalPriceStore } from "./iHistoricalPriceStore";
import { IOHLCPrice } from "./iOHLCPrice";

const logger = debug("stock-chart:store:prices");

export class CryptoCompareHistoricalPriceStore implements IHistoricalPriceStore {

    private readonly currencyLength = 3;

    public async loadData(symbol: string, options: IHistoricalPriceOptions) {

        const baseUrl = "https://min-api.cryptocompare.com/data/histoday";

        const queryString = qs.stringify({
            fsym: symbol.slice(0, this.currencyLength),
            limit: options.numberOfDays,
            tsym: symbol.slice(this.currencyLength),
        });

        const url = `${baseUrl}?${queryString}`;

        logger(`fetching historical data from ${url}`);

        return fetch(url)
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error(response.statusText);
            })
            .then((history: ICryptoCompareHistoricalData) => {
                return history
                    .Data
                    .map((price) => {
                        const date = moment
                            .unix(price.time)
                            .toDate();

                        const volume = price.volumeto - price.volumefrom;

                        return {
                            close: price.close,
                            date,
                            high: price.high,
                            low: price.low,
                            open: price.open,
                            volume,
                        };
                    });
            })
            .then((data: IOHLCPrice[]) => {

                logger(`received ${data.length} prices.`);

                return data;
            });
    }
}
