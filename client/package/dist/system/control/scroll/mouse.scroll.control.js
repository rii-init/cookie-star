export class MouseScrollControl {
    constructor() {
        this.onMouseScroll = () => { };
    }
    setOnMouseScroll(onMouseScroll) {
        this.onMouseScroll = onMouseScroll;
    }
    init() {
        document.addEventListener('wheel', (e) => {
            //e.preventDefault();
            this.onMouseScroll(-e.deltaY);
        }, true);
    }
}
//# sourceMappingURL=mouse.scroll.control.js.map