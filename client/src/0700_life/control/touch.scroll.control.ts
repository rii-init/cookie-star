import { TouchControl } from "./touch.control";

export class TouchScrollControl {
    constructor(
        private control: TouchControl
    ) {

    }

    public setOnTouchScroll(onTouchScroll: (delta: number) => void) {
        this.control.setOnTouchMove((x, y) => {
            onTouchScroll(y/200);
        });
    }
}