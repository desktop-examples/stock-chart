import { Provider } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";

import "../css/styles.css";

import { App } from "./app";
import { stores } from "./stores";

render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById("app"));
