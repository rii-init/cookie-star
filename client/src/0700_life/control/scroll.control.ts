import { MouseScrollControl } from "./mouse.scroll.control";
import { TouchControl } from "./touch.control";
import { TouchScrollControl } from "./touch.scroll.control";

export class ScrollControl {
    
    constructor(
        private onScroll: (delta: number) => void, 
                touch:  TouchControl,
        private mouseScroll = new MouseScrollControl(),
        private touchScroll = new TouchScrollControl(touch),
        
    ) { 
        this.init();
    }

    public init() {
        this.mouseScroll.setOnMouseScroll(this.onScroll);
        this.mouseScroll.init();
        this.touchScroll.setOnTouchScroll(this.onScroll);
    }
}