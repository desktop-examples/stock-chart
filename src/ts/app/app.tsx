import * as React from "react";

import { ResponsiveStockChart } from "./responsiveStockChart";

export class App extends React.PureComponent {
    public render = () => {
        return (
            <ResponsiveStockChart symbol="BTCUSD" description="Bitcoin" />
        );
    }
}
