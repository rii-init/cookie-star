export class TouchControl {
    get dx() {
        return this.delta.x[0] + this.delta.x[1] / 2.0;
    }
    get dy() {
        return this.delta.y[0] + this.delta.y[1] / 2.0;
    }
    setOnTouchMove(onTouchMove) {
        this.onTouchMove = onTouchMove;
    }
    setOnTouchScroll(onTouchScroll) {
        this.onTouchScroll = onTouchScroll;
    }
    constructor() {
        this.onTouchMove = (x, y) => { };
        this.onTouchScroll = (x, y) => { };
        this.one = {
            x: [0, 0],
            y: [0, 0]
        };
        this.two = {
            x: [0, 0],
            y: [0, 0]
        };
        this.delta = {
            x: [0, 0],
            y: [0, 0]
        };
        this.deltaScroll = {
            x: 0,
            y: 0
        };
        this.previousScroll = {
            x: 0,
            y: 0
        };
        this.init();
    }
    init() {
        this.initTouchStart();
        this.initTouchMove();
        this.initTouchEnd();
    }
    initTouchStart() {
        var _a;
        (_a = document.querySelector("#r3f-canvas")) === null || _a === void 0 ? void 0 : _a.addEventListener('touchstart', (event) => {
            const touches = event.touches;
            if (touches.length >= 2) {
                event.preventDefault();
            }
            else {
                this.previousScroll.x = touches[0].clientX;
                this.previousScroll.y = touches[0].clientY;
            }
            for (var i = 0; i < Math.min(2, touches.length); i++) {
                this.one.x[i] = event.touches[i].clientX;
                this.one.y[i] = event.touches[i].clientY;
            }
        });
    }
    initTouchMove() {
        var _a;
        (_a = document.querySelector("#r3f-canvas")) === null || _a === void 0 ? void 0 : _a.addEventListener('touchmove', (event) => {
            var touches = event.touches;
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
                this.two.x[i] = event.touches[i].clientX;
                this.two.y[i] = event.touches[i].clientY;
                this.delta.x[i] = this.two.x[i] - this.one.x[i];
                this.delta.y[i] = this.two.y[i] - this.one.y[i];
                this.one.x[i] = this.two.x[i];
                this.one.y[i] = this.two.y[i];
            }
        });
    }
    initTouchEnd() {
        var _a;
        (_a = document.querySelector("#r3f-canvas")) === null || _a === void 0 ? void 0 : _a.addEventListener('touchend', (event) => {
            const touches = event.touches;
            if (touches.length >= 2) {
                event.preventDefault();
            }
            for (var i = 0; i < Math.min(2, touches.length); i++) {
                this.one.x[i] = 0;
                this.one.y[i] = 0;
                this.delta.x[i] = 0;
                this.delta.y[i] = 0;
            }
            this.previousScroll.x = 0;
            this.previousScroll.y = 0;
        });
    }
}
//# sourceMappingURL=touch.control.js.map