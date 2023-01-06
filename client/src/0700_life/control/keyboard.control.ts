import { MotorCortex } from "./control";

const keys = MotorCortex.keys;

export class KeyboardState {
    public w:     boolean = false;
    public a:     boolean = false;
    public s:     boolean = false;
    public d:     boolean = false;
    public r:     boolean = false;
    public f:     boolean = false;

    public q:     boolean = false;
    public e:     boolean = false;
    
    public space: boolean = false;
    public shift: boolean = false;
    public ctrl:  boolean = false;

    init() {
        document.addEventListener("keydown", (evt) => this.onKeyDown(evt))
        document.addEventListener("keyup",   (evt) => this.onKeyUp(evt))
    }

    onKeyDown(evt: KeyboardEvent) {
        switch (evt.key) {
            case "w":       keys.w     = true; break;
            case "a":       keys.a     = true; break;
            case "s":       keys.s     = true; break;
            case "d":       keys.d     = true; break;

            case "r":       keys.r     = true; break;
            case "f":       keys.f     = true; break;
            
            case "q":       keys.q     = true; break;
            case "e":       keys.e     = true; break;

            case " ":       keys.space = true; break;
            case "Shift":   keys.shift = true; break;
            case "Control": keys.ctrl  = true; break;
        }   
    }
    
    onKeyUp(evt: KeyboardEvent) {
        switch (evt.key) {
            case "w":       keys.w     = false; break;
            case "a":       keys.a     = false; break;
            case "s":       keys.s     = false; break;
            case "d":       keys.d     = false; break;

            case "r":       keys.r     = false; break;
            case "f":       keys.f     = false; break;

            case "q":       keys.q     = false; break;
            case "e":       keys.e     = false; break;

            case " ":       keys.space = false; break;
            case "Shift":   keys.shift = false; break;
            case "Control": keys.ctrl  = false; break;
        }   
    }
}


