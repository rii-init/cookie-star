import { TouchControl } from "../touch.control";

export class TouchScrollControl {
    constructor(
        private control: TouchControl
    ) {

    }

    public setOnTouchScroll(onTouchScroll: (delta: number) => void) {
        this.control.setOnTouchScroll((x, y) => {
            onTouchScroll(y * 2);
        });
    }
}