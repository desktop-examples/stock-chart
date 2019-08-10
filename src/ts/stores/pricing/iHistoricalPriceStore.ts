import { IOHLCPrice } from "./iOHLCPrice";

export interface IHistoricalPriceOptions {
    readonly numberOfDays: number;
}

export interface IHistoricalPriceStore {
    loadData(symbol: string, options: IHistoricalPriceOptions): Promise<IOHLCPrice[]>;
}
