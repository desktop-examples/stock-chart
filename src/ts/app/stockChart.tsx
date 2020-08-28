// tslint:disable:no-any no-unsafe-any
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import * as React from "react";
import {
    BarSeries,
    CandlestickSeries,
    Chart,
    ChartCanvas,
    CrossHairCursor,
    CurrentCoordinate,
    discontinuousTimeScaleProviderBuilder,
    EdgeIndicator,
    ema,
    Label,
    LineSeries,
    MouseCoordinateX,
    MouseCoordinateY,
    sma,
    XAxis,
    YAxis,
} from "react-financial-charts";

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

const arrowWidth = 10;

const titleFill = "#4682B4";
const titleFontSize = 12;
const titleX = 1;
const titleY = 0;

const descriptionFill = "#ffffff";
const descriptionFontSize = 24;
const descriptionX = 0;
const descriptionY = 25;

const volumeChartId = 2;
const volumeStroke = "rgba(70, 130, 180, 0.3)";
const volumeChartHeightPrecentage = 0.25;

const foreground = "#ffffff";
const tickStroke = "rgba(255, 255, 255, 0.3)";
const downColor = "#e74c3c";
const downFill = "rgba(231, 76, 60, 0.5)";
const upColor = "#2ecc71";
const upFill = "rgba(46, 204, 112, 0.5)";

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
                .stroke(volumeStroke)
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
                        textAlign="left"
                        fillStyle={titleFill}
                        fontSize={titleFontSize}
                        text={title} />

                    <Label
                        x={descriptionX}
                        y={descriptionY}
                        textAlign="left"
                        fillStyle={descriptionFill}
                        fontSize={descriptionFontSize}
                        text={description} />

                    <XAxis
                        axisAt="bottom"
                        orient="bottom"
                        tickLabelFill={foreground}
                        showDomain={false}
                        showTicks={false} />
                    <YAxis
                        axisAt="right"
                        orient="right"
                        tickLabelFill={foreground}
                        strokeStyle={tickStroke}
                        ticks={yAxisTickScale}
                        showTicks={false} />

                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        arrowWidth={arrowWidth}
                        fitToText
                        displayFormat={format(".2f")} />

                    <CandlestickSeries
                        stroke={(d) => d.close > d.open ? upColor : downColor}
                        wickStroke={(d) => d.close > d.open ? upColor : downColor}
                        fill={(d) => d.close > d.open ? upFill : downFill} />
                    <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
                    <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />

                    <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
                    <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />

                    <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        arrowWidth={arrowWidth}
                        yAccessor={(d) => d.close}
                        lineStroke={(d) => d.close > d.open ? upColor : downColor}
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
                        fillStyle={volumeStroke} />

                    <LineSeries
                        yAccessor={smaVolume50.accessor()}
                        strokeStyle={smaVolume50.stroke()} />
                </Chart>
                <CrossHairCursor strokeStyle={tickStroke} />
            </ChartCanvas>);
    }
}
