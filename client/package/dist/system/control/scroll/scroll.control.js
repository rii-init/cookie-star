import { MouseScrollControl } from "./mouse.scroll.control";
import { TouchScrollControl } from "./touch.scroll.control";
export class ScrollControl {
    constructor(touch, mouseScroll = new MouseScrollControl(), touchScroll = new TouchScrollControl(touch)) {
        this.mouseScroll = mouseScroll;
        this.touchScroll = touchScroll;
        this.onScrollHandlers = [];
        this.firstScroll = true;
        this.polarity = 1;
        this.onScroll = (delta) => {
            this.onScrollHandlers.forEach(handler => handler(delta * this.polarity));
            if (this.firstScroll) {
                this.polarity = delta > 0 ? 1 : -1;
            }
            this.firstScroll = false;
        };
        this.init();
    }
    addOnScrollHandler(handler) {
        this.onScrollHandlers.push(handler);
    }
    init() {
        this.mouseScroll.setOnMouseScroll(this.onScroll);
        this.mouseScroll.init();
        this.touchScroll.setOnTouchScroll(this.onScroll);
    }
}
//# sourceMappingURL=scroll.control.js.map