import { ControlType } from "./control.type";
export class KeyboardState {
    constructor(controller) {
        this.controller = controller;
        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.r = false;
        this.f = false;
        this.q = false;
        this.e = false;
        this.ArrowUp = false;
        this.ArrowDown = false;
        this.ArrowLeft = false;
        this.ArrowRight = false;
        this.space = false;
        this.shift = false;
        this.ctrl = false;
        this.keyUpCallbacks = [];
        this.keyDownCallbacks = [];
    }
    init() {
        document.addEventListener("keydown", (evt) => this.onKeyDown(evt));
        document.addEventListener("keyup", (evt) => this.onKeyUp(evt));
    }
    addKeyUpHandler(callback) {
        this.keyUpCallbacks.push(callback);
    }
    addKeyDownHandler(callback) {
        this.keyDownCallbacks.push(callback);
    }
    onKeyDown(evt) {
        if (evt.key !== "Escape") {
            this.controller.toggleManualCameraControl(ControlType.Touch__And__Keyboard__And__Mouse);
        }
        else {
            this.controller.toggleManualCameraControl(ControlType.Scrolling);
        }
        switch (evt.key) {
            case "w":
            case "W":
                this.w = true;
                break;
            case "a":
            case "A":
                this.a = true;
                break;
            case "s":
            case "S":
                this.s = true;
                break;
            case "d":
            case "D":
                this.d = true;
                break;
            case "r":
            case "R":
                this.r = true;
                break;
            case "f":
            case "F":
                this.f = true;
                break;
            case "q":
            case "Q":
                this.q = true;
                break;
            case "e":
            case "E":
                this.e = true;
                break;
            case "ArrowUp":
                this.ArrowUp = true;
                break;
            case "ArrowDown":
                this.ArrowDown = true;
                break;
            case "ArrowLeft":
                this.ArrowLeft = true;
                break;
            case "ArrowRight":
                this.ArrowRight = true;
                break;
            case " ":
                this.space = true;
                break;
            case "Shift":
                this.shift = true;
                break;
            case "Control":
                this.ctrl = true;
                break;
        }
        this.keyDownCallbacks.forEach((callback) => callback(evt));
    }
    onKeyUp(evt) {
        switch (evt.key) {
            case "w":
            case "W":
                this.w = false;
                break;
            case "a":
            case "A":
                this.a = false;
                break;
            case "s":
            case "S":
                this.s = false;
                break;
            case "d":
            case "D":
                this.d = false;
                break;
            case "r":
            case "R":
                this.r = false;
                break;
            case "f":
            case "F":
                this.f = false;
                break;
            case "q":
            case "Q":
                this.q = false;
                break;
            case "e":
            case "E":
                this.e = false;
                break;
            case "ArrowUp":
                this.ArrowUp = false;
                break;
            case "ArrowDown":
                this.ArrowDown = false;
                break;
            case "ArrowLeft":
                this.ArrowLeft = false;
                break;
            case "ArrowRight":
                this.ArrowRight = false;
                break;
            case " ":
                this.space = false;
                break;
            case "Shift":
                this.shift = false;
                break;
            case "Control":
                this.ctrl = false;
                break;
        }
        this.keyUpCallbacks.forEach((callback) => callback(evt));
    }
}
//# sourceMappingURL=keyboard.control.js.map