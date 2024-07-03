import { UserControlsSystem } from "./control";
import { ControlType } from "./control.type";

export class MouseState {
    
    public leftButton  = false;
    public rightButton = false;

    public dx = 0;
    public dy = 0;
    public isLocked    = false;
    public canvas: HTMLCanvasElement | null = null;

    private handlers: any = { };


    constructor(public controller: UserControlsSystem) { }

    public addHandler(
        name: string, 
        handler: (state: MouseState) => void
    ): void {
        this.handlers[name] = handler;
    }

    public init() {
        document.addEventListener("mousedown", (evt) => this.onMouseDown(evt));
        document.addEventListener("mouseup",   (evt) => this.onMouseUp(evt));
        document.addEventListener("mousemove", (evt) => this.onMouseMove(evt));
    
        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', () => this.onLockChangeAlert(), false);
        } else if ("onmozpointerlockchange" in document) {
            (document as any).addEventListener('mozpointerlockchange', this.onLockChangeAlert, false);
        }
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        if (!canvas) return console.warn("canvas not available");

        this.canvas = canvas;
        canvas.addEventListener("click", (e: MouseEvent) => {

            const deltaX = Math.abs(e.clientX - (window.innerWidth / 2));

            if (deltaX < (window.innerWidth / 10)) {
                
                const deltaY = Math.abs(e.clientY - (window.innerHeight / 2));

                if (deltaY < (window.innerHeight / 10) ) {
                    
                    if ((deltaX * deltaX + deltaY * deltaY) < (window.innerHeight * window.innerHeight / 200)) {
                        canvas.requestPointerLock();
                        this.setLocked(true );
                        this.controller.mode = ControlType.Touch__And__Keyboard__And__Mouse;
                        
                    }
                }
            }

        })
    }

    private onLockChangeAlert() {
        if (document.pointerLockElement === this.canvas ||
            (document as any).mozPointerLockElement === this.canvas) {
            this.setLocked(true);
            this.controller.toggleManualCameraControl(ControlType.Touch__And__Keyboard__And__Mouse);
        } else {
            this.setLocked(false)
            this.controller.toggleManualCameraControl(ControlType.Scrolling);
        } 
    }

    private setLocked(isLocked: boolean) {
        this.isLocked = isLocked;
    }

    private onMouseMove(evt: MouseEvent) {
        if (this.isLocked) {
            this.dx = evt.movementX;
            this.dy = evt.movementY;
        }
    }

    private onMouseDown(evt: MouseEvent) {
        switch (evt.button) {
            case 0: this.leftButton  = true; break;
            case 2: this.rightButton = true; break;
        }

        for (const idx in this.handlers) {
            this.handlers[idx](this);
        }
    }

    private onMouseUp(evt: MouseEvent) {
        switch (evt.button) {
            case 0: this.leftButton  = false; break;
            case 2: this.rightButton = false; break;
        }
    }    
}

