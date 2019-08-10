export interface IWindowStore {
    readonly title: string;

    updateTitle(title: string): void;
}
