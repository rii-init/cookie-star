export class GamepadControl {

    public gamepads: Gamepad[] = [];

    constructor () {
        this.init();
    }

    private init() {
        this.initGamepadConnected();
        this.initGamepadDisconnected();
    }

    private initGamepadConnected() {
        window.addEventListener('gamepadconnected', (event) => {
            console.log('gamepadconnected', event);
            
        })
    }

    private initGamepadDisconnected() {
        window.addEventListener('gamepaddisconnected', (event) => {
            console.log('gamepaddisconnected', event);
        })
    }


}