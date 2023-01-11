export class TouchControl { 

    private x1 = 0;
    private y1 = 0;

    public dx = 0;
    public dy = 0;

    constructor() {
        this.init()
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
            this.x1 = x2;
            this.y1 = y2;

            this.dx = x2 - this.x1;
            this.dy = y2 - this.y1;
        })
    }

    private initTouchEnd() {
        document.addEventListener('touchend', () => {
            this.x1 = 0
            this.y1 = 0
        })
    }


}