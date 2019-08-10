import * as debug from "debug";

import { IServiceWorkerStore } from "./iServiceWorkerStore";

const logger = debug("stock-chart:store:serviceWorker");

export class ServiceWorkerStore implements IServiceWorkerStore {

    public constructor() {
        this.initialize();
    }

    public initialize = () => {
        if (process.env.NODE_ENV === "production") {

            window.onload = () => {

                import("offline-plugin/runtime")
                    .then((runtime) => {
                        runtime.install({
                            onInstalled: () => {
                                logger("onInstalled");
                            },
                            onUpdateFailed: () => {
                                logger("onUpdateFailed");
                            },
                            onUpdateReady: () => {
                                logger("onUpdateReady");
                                runtime.applyUpdate();
                            },
                            onUpdated: () => {
                                logger("onUpdated");
                                location.reload();
                            },
                            onUpdating: () => {
                                logger("onUpdating");
                            },
                        });
                    })
                    .catch((error) => {
                        logger(error);
                    });
            };
        }
    }
}
