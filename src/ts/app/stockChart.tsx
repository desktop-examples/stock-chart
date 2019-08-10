// tslint:disable:no-any no-unsafe-any
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import * as React from "react";
import { Chart, ChartCanvas } from "react-stockcharts";
import { Label } from "react-stockcharts/lib/annotation";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    CurrentCoordinate,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { ema, sma } from "react-stockcharts/lib/indicator";
import { discontinuousTimeScaleProviderBuilder } from "react-stockcharts/lib/scale";
import {
    BarSeries,
    CandlestickSeries,
    LineSeries,
} from "react-stockcharts/lib/series";

interface IStockChartProps {
    readonly data: any[];
    readonly description: string;
    readonly height: number;
    readonly ratio: number;
    readonly title: string;
    readonly width: number;
}

interface IStockChartState {
    data: any;
    displayXAccessor: any;
    ema12?: any;
    ema26?: any;
    linearData: any;
    smaVolume50?: any;
    xAccessor: any;
    xScale: any;
}

const padding = { top: 30, bottom: 30 };
const margin = { left: 20, right: 70, top: 20, bottom: 60 };
const yAxisTickScale = 5;

const tickStrokeOpacity = 0.3;

const titleFill = "#4682B4";
const titleFontSize = 12;
const titleX = 1;
const titleY = 0;

const descriptionFill = "#ffffff";
const descriptionFontSize = 24;
const descriptionX = 0;
const descriptionY = 25;

const volumeChartId = 2;
const volumeOpacity = 0.3;
const volumeChartHeightPrecentage = 0.25;

const foreground = "#ffffff";
const downColor = "#e74c3c";
const upColor = "#2ecc71";

export class StockChart extends React.Component<IStockChartProps, IStockChartState> {

    public constructor(props: IStockChartProps) {
        super(props);
        const { data: inputData } = props;

        const ema26Id = 0;
        const ema26 =
            ema()
                .id(ema26Id)
                .options({ windowSize: 26 })
                .merge((d, c) => { d.ema26 = c; })
                .accessor((d) => d.ema26);

        const ema12Id = 1;
        const ema12 =
            ema()
                .id(ema12Id)
                .options({ windowSize: 12 })
                .merge((d, c) => { d.ema12 = c; })
                .accessor((d) => d.ema12);

        const smaId = 2;
        const smaVolume50 =
            sma()
                .id(smaId)
                .options({
                    sourcePath: "volume",
                    windowSize: 50,
                })
                .merge((d, c) => { d.smaVolume50 = c; })
                .accessor((d) => d.smaVolume50);

        const calculatedData = ema26(ema12(smaVolume50(inputData)));
        const indexCalculator =
            discontinuousTimeScaleProviderBuilder()
                .indexCalculator();

        const { index } = indexCalculator(calculatedData);

        const xScaleProvider =
            discontinuousTimeScaleProviderBuilder()
                .withIndex(index);
        const { data: linearData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

        this.state = {
            data: linearData,
            displayXAccessor,
            ema12,
            ema26,
            linearData,
            smaVolume50,
            xAccessor,
            xScale,
        };
    }

    public render() {
        const { description, height, title, width, ratio } = this.props;
        const { data, ema26, ema12, smaVolume50, xScale, xAccessor, displayXAccessor } = this.state;
        const volumeChartHeight = height * volumeChartHeightPrecentage;

        return (
            <ChartCanvas
                ratio={ratio}
                width={width}
                height={height}
                margin={margin}
                seriesName={title}
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}>
                <Chart
                    id={1}
                    padding={padding}
                    yExtents={[(d) => [d.high, d.low], ema26.accessor(), ema12.accessor()]}>

                    <Label
                        x={titleX}
                        y={titleY}
                        fill={titleFill}
                        fontSize={titleFontSize}
                        text={title}
                        textAnchor="left" />

                    <Label
                        x={descriptionX}
                        y={descriptionY}
                        fill={descriptionFill}
                        fontSize={descriptionFontSize}
                        text={description}
                        textAnchor="left" />

                    <XAxis
                        axisAt="bottom"
                        opacity={tickStrokeOpacity}
                        orient="bottom"
                        showDomain={false}
                        stroke={foreground}
                        strokeWidth={0}
                        tickStroke={foreground}
                        tickStrokeOpacity={0} />
                    <YAxis
                        axisAt="right"
                        opacity={tickStrokeOpacity}
                        orient="right"
                        ticks={yAxisTickScale}
                        tickStroke={foreground}
                        tickStrokeOpacity={0} />

                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")} />

                    <CandlestickSeries
                        stroke={(d) => d.close > d.open ? upColor : downColor}
                        wickStroke={(d) => d.close > d.open ? upColor : downColor}
                        fill={(d) => d.close > d.open ? upColor : downColor} />
                    <LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()} />
                    <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />

                    <CurrentCoordinate yAccessor={ema26.accessor()} fill={ema26.stroke()} />
                    <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />

                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={(d) => d.close}
                        fill={(d) => d.close > d.open ? upColor : downColor} />
                </Chart>
                <Chart
                    id={volumeChartId}
                    height={volumeChartHeight}
                    yExtents={[(d) => d.volume, smaVolume50.accessor()]}
                    origin={(_, h) => [0, h - volumeChartHeight]}>

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%e %b")} />

                    <BarSeries
                        yAccessor={(d) => d.volume}
                        stroke={false}
                        opacity={volumeOpacity} />

                    <LineSeries
                        yAccessor={smaVolume50.accessor()}
                        stroke={smaVolume50.stroke()}
                        strokeOpacity={volumeOpacity} />
                </Chart>
                <CrossHairCursor stroke={foreground} />
            </ChartCanvas>);
    }
}
