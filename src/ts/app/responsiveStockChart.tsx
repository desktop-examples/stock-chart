// tslint:disable:no-any no-unsafe-any
import * as debug from "debug";
import { observable, runInAction } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import FlexView from "react-flexview";
import { fitDimensions } from "react-stockcharts/lib/helper";

import { IHistoricalPriceStore } from "../stores/pricing/iHistoricalPriceStore";
import { IOHLCPrice } from "../stores/pricing/iOHLCPrice";
import { IWindowStore } from "../stores/window/iWindowStore";

import { StockChart } from "./stockChart";

const logger = debug("stock-chart:component:responsiveStockChart");

const FittedStockChart = fitDimensions(StockChart);

interface IResponsiveStockChart {
    readonly description: string;
    readonly historicalPriceStore?: IHistoricalPriceStore;
    readonly symbol: string;
    readonly windowStore?: IWindowStore;
}

@inject("historicalPriceStore")
@inject("windowStore")
@observer
export class ResponsiveStockChart extends React.Component<IResponsiveStockChart> {

    @observable
    private prices: IOHLCPrice[] = [];

    public constructor(props: IResponsiveStockChart) {

        super(props);

        const { historicalPriceStore, symbol, windowStore } = props;

        historicalPriceStore!
            .loadData(symbol, {
                numberOfDays: 180,
            })
            .then((prices) => {
                runInAction(() => {
                    this.prices = prices;
                });
            })
            .catch((error) => {
                logger(error);
            });

        windowStore!.updateTitle(`${symbol} - Stock Chart`);
    }

    public render() {
        const { description, symbol } = this.props;

        const prices = this.prices;
        if (prices.length === 0) {
            return (
                <FlexView grow shrink basis="0" vAlignContent="center" hAlignContent="center">
                    Loading...
                </FlexView>
            );
        }

        return (
            <>
                <FittedStockChart
                    data={prices}
                    description={description}
                    title={symbol} />
                <div className="attribution"></div>
            </>
        );
    }
}
