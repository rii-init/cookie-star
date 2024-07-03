export declare class TouchControl {
    private onTouchMove;
    private onTouchScroll;
    private one;
    private two;
    delta: {
        x: number[];
        y: number[];
    };
    deltaScroll: {
        x: number;
        y: number;
    };
    previousScroll: {
        x: number;
        y: number;
    };
    get dx(): number;
    get dy(): number;
    setOnTouchMove(onTouchMove: (x: number, y: number) => void): void;
    setOnTouchScroll(onTouchScroll: (x: number, y: number) => void): void;
    constructor();
    private init;
    private initTouchStart;
    private initTouchMove;
    private initTouchEnd;
}
//# sourceMappingURL=touch.control.d.ts.map