import { WindowStore } from "../../stores/window/windowStore";

describe("title", () => {

    test("should have a default", () => {
        const store = new WindowStore();

        expect(store.title)
            .toBe("Stock Chart");
    });
});
