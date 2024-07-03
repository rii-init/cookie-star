import { ControlType } from "./control.type";
export class MouseState {
    constructor(controller) {
        this.controller = controller;
        this.leftButton = false;
        this.rightButton = false;
        this.dx = 0;
        this.dy = 0;
        this.isLocked = false;
        this.canvas = null;
        this.handlers = {};
    }
    addHandler(name, handler) {
        this.handlers[name] = handler;
    }
    init() {
        document.addEventListener("mousedown", (evt) => this.onMouseDown(evt));
        document.addEventListener("mouseup", (evt) => this.onMouseUp(evt));
        document.addEventListener("mousemove", (evt) => this.onMouseMove(evt));
        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', () => this.onLockChangeAlert(), false);
        }
        else if ("onmozpointerlockchange" in document) {
            document.addEventListener('mozpointerlockchange', this.onLockChangeAlert, false);
        }
    }
    setCanvas(canvas) {
        if (!canvas)
            return console.warn("canvas not available");
        this.canvas = canvas;
        canvas.addEventListener("click", (e) => {
            const deltaX = Math.abs(e.clientX - (window.innerWidth / 2));
            if (deltaX < (window.innerWidth / 10)) {
                const deltaY = Math.abs(e.clientY - (window.innerHeight / 2));
                if (deltaY < (window.innerHeight / 10)) {
                    if ((deltaX * deltaX + deltaY * deltaY) < (window.innerHeight * window.innerHeight / 200)) {
                        canvas.requestPointerLock();
                        this.setLocked(true);
                        this.controller.mode = ControlType.Touch__And__Keyboard__And__Mouse;
                    }
                }
            }
        });
    }
    onLockChangeAlert() {
        if (document.pointerLockElement === this.canvas ||
            document.mozPointerLockElement === this.canvas) {
            this.setLocked(true);
            this.controller.toggleManualCameraControl(ControlType.Touch__And__Keyboard__And__Mouse);
        }
        else {
            this.setLocked(false);
            this.controller.toggleManualCameraControl(ControlType.Scrolling);
        }
    }
    setLocked(isLocked) {
        this.isLocked = isLocked;
    }
    onMouseMove(evt) {
        if (this.isLocked) {
            this.dx = evt.movementX;
            this.dy = evt.movementY;
        }
    }
    onMouseDown(evt) {
        switch (evt.button) {
            case 0:
                this.leftButton = true;
                break;
            case 2:
                this.rightButton = true;
                break;
        }
        for (const idx in this.handlers) {
            this.handlers[idx](this);
        }
    }
    onMouseUp(evt) {
        switch (evt.button) {
            case 0:
                this.leftButton = false;
                break;
            case 2:
                this.rightButton = false;
                break;
        }
    }
}
//# sourceMappingURL=mouse.control.js.map