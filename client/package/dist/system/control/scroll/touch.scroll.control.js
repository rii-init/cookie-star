export class TouchScrollControl {
    constructor(control) {
        this.control = control;
    }
    setOnTouchScroll(onTouchScroll) {
        this.control.setOnTouchScroll((x, y) => {
            onTouchScroll(y * 2);
        });
    }
}
//# sourceMappingURL=touch.scroll.control.js.map