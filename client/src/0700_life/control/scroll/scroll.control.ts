import { MouseScrollControl } from "./mouse.scroll.control";
import { TouchControl } from "../touch.control";
import { TouchScrollControl } from "./touch.scroll.control";

export class ScrollControl {
    
    private onScrollHandlers = [] as ((delta: number) => void)[];

    private firstScroll = true;
    private polarity = 1;

    private onScroll = (delta: number) => {
        
        this.onScrollHandlers.forEach(handler => handler(delta));

        if (this.firstScroll) {
            this.polarity = delta > 0 ? 1 : -1;
        }

        this.firstScroll = false;
    }

    constructor(
                touch:  TouchControl,
        private mouseScroll = new MouseScrollControl(),
        private touchScroll = new TouchScrollControl(touch),
        
    ) { 
        this.init();
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
