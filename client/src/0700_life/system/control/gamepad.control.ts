import { UserControlsSystem } from "./control";

export class GamepadControl {

    public gamepads: Gamepad[] = [];
    
    private controls: UserControlsSystem; 
    
    constructor (userControl: UserControlsSystem) {
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
        
            this.controls.controllersAttached = false;
        })
    }


}