import { UserControls } from "./control";

export class GamepadControl {

    public gamepads: Gamepad[] = [];
    
    private controls: UserControls; 
    
    constructor (userControl: UserControls) {
        this.controls = userControl;
        this.init();
    }

    private init() {
        this.initGamepadConnected();
        this.initGamepadDisconnected();
    }

    private initGamepadConnected() {
        window.addEventListener('gamepadconnected', (event) => {
            console.log('gamepadconnected', event);
            this.controls.controllersAttached = true;
        })
    }

    private initGamepadDisconnected() {
        window.addEventListener('gamepaddisconnected', (event) => {
            console.log('gamepaddisconnected', event);
        })
    }


}