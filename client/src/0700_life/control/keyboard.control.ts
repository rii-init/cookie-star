export class KeyboardState {
    public w:     boolean = false;
    public a:     boolean = false;
    public s:     boolean = false;
    public d:     boolean = false;
    public r:     boolean = false;
    public f:     boolean = false;

    public q:     boolean = false;
    public e:     boolean = false;
    
    public ArrowUp:    boolean = false;
    public ArrowDown:  boolean = false;
    public ArrowLeft:  boolean = false;
    public ArrowRight: boolean = false;

    public space: boolean = false;
    public shift: boolean = false;
    public ctrl:  boolean = false;

    private keyUpCallbacks: ((evt: KeyboardEvent) => void)[]   = [];
    private keyDownCallbacks: ((evt: KeyboardEvent) => void)[] = [];

    init() {
        document.addEventListener("keydown", (evt) => this.onKeyDown(evt))
        document.addEventListener("keyup",   (evt) => this.onKeyUp(evt))
    }

    public addKeyUpHandler(callback: (evt: KeyboardEvent) => void) {
        this.keyUpCallbacks.push(callback);
    }

    public addKeyDownHandler(callback: (evt: KeyboardEvent) => void) {
        this.keyDownCallbacks.push(callback);
    }

    onKeyDown(evt: KeyboardEvent) {
        switch (evt.key) {
            case "w": case "W": this.w = true; break;
            case "a": case "A": this.a = true; break;
            case "s": case "S": this.s = true; break;
            case "d": case "D": this.d = true; break;

            case "r": case "R": this.r = true; break;
            case "f": case "F": this.f = true; break;
            
            case "q": case "Q": this.q = true; break;
            case "e": case "E": this.e = true; break;

            case "ArrowUp":    this.ArrowUp    = true; break;
            case "ArrowDown":  this.ArrowDown  = true; break;
            case "ArrowLeft":  this.ArrowLeft  = true; break;
            case "ArrowRight": this.ArrowRight = true; break;

            case " ":       this.space = true; break;
            case "Shift":   this.shift = true; break;
            case "Control": this.ctrl  = true; break;
        }
        
        this.keyDownCallbacks.forEach((callback) => callback(evt));
    }
    
    onKeyUp(evt: KeyboardEvent) {
        switch (evt.key) {
            case "w": case "W": this.w = false; break;
            case "a": case "A": this.a = false; break;
            case "s": case "S": this.s = false; break;
            case "d": case "D": this.d = false; break;

            case "r": case "R": this.r = false; break;
            case "f": case "F": this.f = false; break;
            
            case "q": case "Q": this.q = false; break;
            case "e": case "E": this.e = false; break;

            case "ArrowUp":    this.ArrowUp    = false; break;
            case "ArrowDown":  this.ArrowDown  = false; break;
            case "ArrowLeft":  this.ArrowLeft  = false; break;
            case "ArrowRight": this.ArrowRight = false; break;

            case " ":       this.space = false; break;
            case "Shift":   this.shift = false; break;
            case "Control": this.ctrl  = false; break;
        }
        
        this.keyUpCallbacks.forEach((callback) => callback(evt));
    }
}


