
export class TouchControl { 

    private onTouchMove: (x: number, y: number) => void = (x, y) => {};
    private onTouchScroll: (x: number, y: number) => void = (x, y) => {};

    private one = {
        x: [0,0],
        y: [0,0]
    }

    private two = {
        x: [0,0],
        y: [0,0]
    }

    public delta = {
        x: [0,0],
        y: [0,0]
    }


    public deltaScroll = {
        x: 0,
        y: 0
    }

    public previousScroll = {
        x: 0,
        y: 0
    }

    public get dx() {
        return this.delta.x[0] + this.delta.x[1] / 2.0;
    }

    public get dy() {
        return this.delta.y[0] + this.delta.y[1] / 2.0;
    }

    public setOnTouchMove(onTouchMove: (x: number, y: number) => void) {
        this.onTouchMove = onTouchMove;
    }

    public setOnTouchScroll(onTouchScroll: (x: number, y: number) => void) {
        this.onTouchScroll = onTouchScroll;
    }

    constructor() {
        this.init()
    }

    private init() {
        this.initTouchStart()
        this.initTouchMove()
        this.initTouchEnd()
    }

    private initTouchStart() {
        document.querySelector("#r3f-canvas")?.addEventListener('touchstart', (event) => {
            const touches = (event as TouchEvent).touches;
            
            if (touches.length >= 2) {
                event.preventDefault();
            } else {
                this.previousScroll.x = touches[0].clientX;
                this.previousScroll.y = touches[0].clientY;
            }

            for (var i = 0; i < Math.min(2,touches.length); i++) {
                this.one.x[i] = (event as TouchEvent).touches[i].clientX
                this.one.y[i] = (event as TouchEvent).touches[i].clientY
            }
        })
    }

    private initTouchMove() {
        document.querySelector("#r3f-canvas")?.addEventListener('touchmove', (event) => {
            var touches = (event as TouchEvent).touches;
            
            if (touches.length >= 2) {
                event.preventDefault();
            }

            if (touches.length == 1) {

                this.deltaScroll.x = touches[0].clientX - this.previousScroll.x;
                this.deltaScroll.y = touches[0].clientY - this.previousScroll.y;

                this.onTouchScroll(this.deltaScroll.x, this.deltaScroll.y);

                this.previousScroll.x = touches[0].clientX;
                this.previousScroll.y = touches[0].clientY;

                return;
            }

            for (var i = 0; i < Math.min(2, touches.length); i++) {
            
                this.two.x[i] = (event as TouchEvent).touches[i].clientX
                this.two.y[i] = (event as TouchEvent).touches[i].clientY
                
                this.delta.x[i] = this.two.x[i] - this.one.x[i];
                this.delta.y[i] = this.two.y[i] - this.one.y[i];
                
                this.one.x[i] = this.two.x[i];
                this.one.y[i] = this.two.y[i];
            }
        })
    }

    private initTouchEnd() {
        document.querySelector("#r3f-canvas")?.addEventListener('touchend', (event) => {
            const touches = (event as TouchEvent).touches;
            
            if (touches.length >= 2) {
                event.preventDefault();
            }

            for (var i = 0; i < Math.min(2,touches.length); i++) {
                this.one.x[i] = 0;
                this.one.y[i] = 0;
                this.delta.x[i] = 0;
                this.delta.y[i] = 0;
            }

            this.previousScroll.x = 0;
            this.previousScroll.y = 0;
        })
    }


}