import { XRController } from "@react-three/xr";
import { Camera, Vector3 } from "three";

import { GamepadControl } from "../control/gamepad.control";
import { KeyboardState }  from "../control/keyboard.control";
import { MouseState }     from "../control/mouse.control";
import { TouchControl }   from "../control/touch.control";

import { InteractionObject } from "./interaction-object";
import { InteractionVector } from "./interaction-vector";

export class InteractionModel {

    private isXRMode: boolean = false;
    private objectsInFocus: Array<InteractionObject> = [];

    private actuate(params: InteractionVector) {
        this.objectsInFocus.forEach((object) => {
            object.actuate(params);
        });
    }    


    // call externally:
    public setXRMode(isXR: boolean): void {
        this.isXRMode = isXR;
    }

    // call from animation loop:
    public updateObjectsInFocus(): void {

    }

    public setRayCasterSource(from: Camera): void {

    }

    public setXRControllerRayCasterSource(from: XRController): void {

    }

    // call from user_controls:
    public setMouseActuator(control: MouseState) {
        // OwO i have to add click handler..
    }

    public setKeyboardActuator(control: KeyboardState) {
        // handle pressing the 'e' key:
        control.addKeyDownHandler((evt: KeyboardEvent) => {
            if (evt.key === "e") {

                // actuate the objects in focus:
                this.actuate(new InteractionVector(new Vector3(0, 0, 0)));
            }
        });
    }

    public setTouchActuator(control: TouchControl) {

    }

    public setGamepadActuator(control: GamepadControl) {

    }

    // public setVoiceActuator(control: VoiceControl) { }
    // public setXRControllerActuator(control: XRControllerControl) {
    // }

}