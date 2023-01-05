import { MotorCortex } from "./control";

const keys = MotorCortex.keys;

export class KeyboardState {
    w:     boolean = false;
    a:     boolean = false;
    s:     boolean = false;
    d:     boolean = false;
    space: boolean = false;
    shift: boolean = false;
    ctrl:  boolean = false;
}

export const onKeyDown = (evt: KeyboardEvent) => {
    switch (evt.key) {
        case "w":       keys.w     = true; break;
        case "a":       keys.a     = true; break;
        case "s":       keys.s     = true; break;
        case "d":       keys.d     = true; break;
        case " ":       keys.space = true; break;
        case "Shift":   keys.shift = true; break;
        case "Control": keys.ctrl  = true; break;
    }   
}

export const onKeyUp = (evt: KeyboardEvent) => {
    switch (evt.key) {
        case "w":       keys.w     = false; break;
        case "a":       keys.a     = false; break;
        case "s":       keys.s     = false; break;
        case "d":       keys.d     = false; break;
        case " ":       keys.space = false; break;
        case "Shift":   keys.shift = false; break;
        case "Control": keys.ctrl  = false; break;
    }   
}