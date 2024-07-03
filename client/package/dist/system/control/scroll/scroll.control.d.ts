import { MouseScrollControl } from "./mouse.scroll.control";
import { TouchControl } from "../touch.control";
import { TouchScrollControl } from "./touch.scroll.control";
export declare class ScrollControl {
    private mouseScroll;
    private touchScroll;
    private onScrollHandlers;
    private firstScroll;
    private polarity;
    private onScroll;
    constructor(touch: TouchControl, mouseScroll?: MouseScrollControl, touchScroll?: TouchScrollControl);
    addOnScrollHandler(handler: (delta: number) => void): void;
    init(): void;
}
//# sourceMappingURL=scroll.control.d.ts.map