import { action, autorun, observable } from "mobx";

import { IWindowStore } from "./iWindowStore";

export class WindowStore implements IWindowStore {
    @observable
    public title = "Stock Chart";

    public constructor() {
        autorun(() => {
            document.title = this.title;
        });
    }

    @action
    public updateTitle(title: string): void {
        this.title = title;
    }
}
