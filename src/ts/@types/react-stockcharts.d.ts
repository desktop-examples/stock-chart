declare module "react-stockcharts" {
    interface ChartProps {
        id: number | string;
        height?: number;
        origin?: number[] | any;
        padding?: number | any;
        yExtents?: number[] | any;
    }

    export class Chart extends React.Component<ChartProps> {

    }

    interface ChartCanvasProps {
        data: any[];
        displayXAccessor?: any;
        ratio: number;
        width: number;
        height: number;
        margin?: any;
        seriesName?: string;
        type?: "svg" | "hybrid";
        xAccessor?: any;
        xScale: any;
    }

    export class ChartCanvas extends React.Component<ChartCanvasProps> {

    }
}
declare module "react-stockcharts/lib/annotation";
declare module "react-stockcharts/lib/axes" {
    interface XAxisProps {
        axisAt: "top" | "bottom" | "middle";
        orient: "top" | "bottom";
        opacity?: number;
        showDomain?: boolean;
        showTicks?: boolean;
        stroke?: string;
        strokeWidth?: number;
        ticks?: number;
        tickStroke?: string;
        tickStrokeOpacity?: number;
    }
    export class XAxis extends React.Component<XAxisProps> {

    }
    interface YAxisProps {
        axisAt: "right" | "left" | "middle";
        orient: "right" | "left";
        opacity?: number;
        showDomain?: boolean;
        showTicks?: boolean;
        ticks?: number;
        tickStroke?: string;
        tickStrokeOpacity?: number;
    }
    export class YAxis extends React.Component<YAxisProps> {

    }
}
declare module "react-stockcharts/lib/coordinates";
declare module "react-stockcharts/lib/helper" {
    export function fitDimensions<P extends Object>(wrappedComponent: React.ComponentType<P>);
}
declare module "react-stockcharts/lib/indicator" {
    export function atr();
    export function bollingerBand();
    export function ema();
    export function kagi();
    export function macd();
    export function renko();
    export function rsi();
    export function sar();
    export function sma();
    export function tma();
    export function wma();
}
declare module "react-stockcharts/lib/scale" {
    export function discontinuousTimeScaleProviderBuilder();
}

declare module "react-stockcharts/lib/series" {

    interface BarSeriesProps {
        yAccessor: any;
        opacity?: number;
        stroke?: boolean;
        baseAt?: number | any;
        width?: number | any;
        fill?: string | any;
        className?: string | any;
        clip?: boolean,
        swapScales?: boolean,
    }

    export class BarSeries extends React.Component<BarSeriesProps> {

    }

    interface CandlestickSeriesProps {
        yAccessor?: any;
        fill?: string | any;
        opacity?: number;
        stroke?: string | any;
        strokeOpacity?: number;
        wickStroke?: string | any;
        className?: string;
        wickClassName?: string;
        candleClassName?: string;
        widthRatio?: number;
        width?: number | any;
        classNames?: string | any;
        clip?: boolean,
    }

    export class CandlestickSeries extends React.Component<CandlestickSeriesProps> {

    }

    interface LineSeriesProps {
        opacity?: number;
        stroke?: string;
        strokeOpacity?: number;
        className?: string,
        strokeWidth?: number,
        hoverStrokeWidth?: number,
        fill?: string,
        defined?: any,
        hoverTolerance?: number,
        strokeDasharray?: any,
        highlightOnHover?: boolean,
        onClick?: any,
        onDoubleClick?: any,
        onHover?: any,
        onUnHover?: any,
        onContextMenu?: any,
        yAccessor?: any,
        connectNulls?: boolean,
        interpolation?: any,
        canvasClip?: any,
        style?: any,
    }

    export class LineSeries extends React.Component<LineSeriesProps> {

    }
}

declare module "react-stockcharts/lib/tooltip" {

    interface SingleMAToolTipProps {
        origin: number[],
        color: string,
        displayName: string,
        value: string,
        onClick?: any,
        fontFamily?: string,
        textFill?: string,
        labelFill?: string,
        fontSize?: number,
        forChart: number | string,
        options: any,
    }

    export class SingleMAToolTip extends React.Component<SingleMAToolTipProps> {

    }

    interface MovingAverageTooltipProps {
        className?: string,
        displayFormat?: any,
        origin?: number[] | any;
        options?: any[];
        textFill?: string,
        labelFill?: string,
        fontFamily?: string,
        fontSize?: number,
        width?: number,
    }

    export class MovingAverageTooltip extends React.Component<MovingAverageTooltipProps> {

    }

    interface OHLCTooltipProps {
        accessor?: any;
        className?: string;
        displayTexts?: any;
        fontFamily?: string,
        fontSize?: number,
        origin?: number[] | any;
        textFill?: string,
        labelFill?: string,
        xDisplayFormat?: any,
    }

    export class OHLCTooltip extends React.Component<OHLCTooltipProps> {

    }
}
