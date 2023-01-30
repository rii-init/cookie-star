import { MouseScrollControl } from "./mouse.scroll.control";
import { PageControl } from "./page-control";
import { TouchControl } from "./touch.control";
import { TouchScrollControl } from "./touch.scroll.control";

export class ScrollControl {
    
    private onScrollHandlers = [] as ((delta: number) => void)[];

    private onScroll = (delta: number) => {
        this.onScrollHandlers.forEach(handler => handler(-delta));
    }

    constructor(
                touch:  TouchControl,
        private mouseScroll = new MouseScrollControl(),
        private touchScroll = new TouchScrollControl(touch),
        
    ) { 
        this.init();
        PageControl.scrollControl = this;
    }

    public addOnScrollHandler(handler: (delta: number) => void) {
        this.onScrollHandlers.push(handler);
    }
    
    public init() {
        this.mouseScroll.setOnMouseScroll(this.onScroll);
        this.mouseScroll.init();
        this.touchScroll.setOnTouchScroll(this.onScroll);
    }
}
