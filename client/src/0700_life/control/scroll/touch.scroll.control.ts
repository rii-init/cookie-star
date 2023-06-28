import { diagnosticState } from "../../../0000/r3f-debug";
import { TouchControl } from "../touch.control";

export class TouchScrollControl {
    constructor(
        private control: TouchControl
    ) {

    }

    public setOnTouchScroll(onTouchScroll: (delta: number) => void) {
        this.control.setOnTouchScroll((x, y) => {
            onTouchScroll(y/200);
            diagnosticState.addMessage("touch scroll: " + y/200);
        });
    }
}