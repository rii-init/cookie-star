import { MotorCortex } from "./control";

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
            case "w":       this.w     = true; break;
            case "a":       this.a     = true; break;
            case "s":       this.s     = true; break;
            case "d":       this.d     = true; break;

            case "r":       this.r     = true; break;
            case "f":       this.f     = true; break;
            
            case "q":       this.q     = true; break;
            case "e":       this.e     = true; break;

            case " ":       this.space = true; break;
            case "Shift":   this.shift = true; break;
            case "Control": this.ctrl  = true; break;
        }   
    }
    
    onKeyUp(evt: KeyboardEvent) {
        switch (evt.key) {
            case "w":       this.w     = false; break;
            case "a":       this.a     = false; break;
            case "s":       this.s     = false; break;
            case "d":       this.d     = false; break;

            case "r":       this.r     = false; break;
            case "f":       this.f     = false; break;

            case "q":       this.q     = false; break;
            case "e":       this.e     = false; break;

            case " ":       this.space = false; break;
            case "Shift":   this.shift = false; break;
            case "Control": this.ctrl  = false; break;
        }   
    }
}


