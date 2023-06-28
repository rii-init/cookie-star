import { diagnosticState } from "../../0000/r3f-debug";

export class TouchControl { 

    private onTouchMove: (x: number, y: number) => void = (x, y) => {};

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

    public get dx() {
        return this.delta.x[0] + this.delta.x[1] / 2.0;
    }

    public get dy() {
        return this.delta.y[0] + this.delta.y[1] / 2.0;
    }

    public setOnTouchMove(onTouchMove: (x: number, y: number) => void) {
        this.onTouchMove = onTouchMove;
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
                this.onTouchMove(touches[0].clientX, touches[0].clientY);

                diagnosticState.addMessage("touch " + touches[0].clientX + " ," + touches[0].clientY)
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
        })
    }


}