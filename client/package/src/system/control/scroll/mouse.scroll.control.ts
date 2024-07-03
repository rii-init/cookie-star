
export class MouseScrollControl {
    private onMouseScroll: (delta: number) => void = () => {};
     
    public setOnMouseScroll(onMouseScroll: (delta: number) => void) {
        this.onMouseScroll = onMouseScroll;
    }

    public init() {
        document.addEventListener('wheel', (e) => {
        //e.preventDefault();
            this.onMouseScroll(-e.deltaY);
        }, true);
    }
}
