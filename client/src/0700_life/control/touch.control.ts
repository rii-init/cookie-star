export class TouchControl { 

    public x1 = 0;
    public y1 = 0;

    private touchMoveCallback: (dx: number, dy: number) => void = () => {};

    constructor() {
        this.init()
    }

    public setTouchMoveListener(callback: (dx: number, dy: number) => void) {
        this.touchMoveCallback = callback;
    }

    private init() {
        this.initTouchStart()
        this.initTouchMove()
        this.initTouchEnd()
    }

    private initTouchStart() {
        document.addEventListener('touchstart', (event) => {
            this.x1 = event.touches[0].clientX
            this.y1 = event.touches[0].clientY
        })
    }

    private initTouchMove() {
        document.addEventListener('touchmove', (event) => {
            const x2 = event.touches[0].clientX
            const y2 = event.touches[0].clientY
            const dx = x2 - this.x1;
            const dy = y2 - this.y1;
            this.x1 = x2;
            this.y1 = y2;

            this.touchMoveCallback(dx, dy);
        })
    }

    private initTouchEnd() {
        document.addEventListener('touchend', () => {
            this.x1 = 0
            this.y1 = 0
        })
    }


}