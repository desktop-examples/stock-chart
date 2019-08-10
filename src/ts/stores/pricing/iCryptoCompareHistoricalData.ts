interface ICryptoCompareOHLCPrice {
    readonly close: number;
    readonly high: number;
    readonly low: number;
    readonly open: number;
    readonly time: number;
    readonly volumefrom: number;
    readonly volumeto: number;
}

interface ICryptoCompareHistoricalData {
    readonly Aggregated: boolean;
    readonly Data: ICryptoCompareOHLCPrice[];
    readonly FirstValueInArray: boolean;
    readonly HasWarning: boolean;
    readonly Response: string;
    readonly TimeFrom: number;
    readonly TimeTo: number;
    readonly Type: number;
}
