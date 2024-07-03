export class GamepadControl {
    constructor(userControl) {
        this.gamepads = [];
        this.controls = userControl;
        this.init();
    }
    init() {
        this.initGamepadConnected();
        this.initGamepadDisconnected();
    }
    initGamepadConnected() {
        window.addEventListener('gamepadconnected', (event) => {
            console.log('gamepadconnected', event);
            this.controls.controllersAttached = true;
        });
    }
    initGamepadDisconnected() {
        window.addEventListener('gamepaddisconnected', (event) => {
            console.log('gamepaddisconnected', event);
            this.controls.controllersAttached = false;
        });
    }
}
//# sourceMappingURL=gamepad.control.js.map