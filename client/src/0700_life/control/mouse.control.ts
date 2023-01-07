export class MouseState {
    public leftButton  = false;
    public rightButton = false;
    public dx = 0;
    public dy = 0;
    public isLocked    = false;
    public canvas: HTMLCanvasElement | null = null;

    private handlers: any = { };

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
            document.addEventListener('pointerlockchange', this.onLockChangeAlert, false);
        } else if ("onmozpointerlockchange" in document) {
            (document as any).addEventListener('mozpointerlockchange', this.onLockChangeAlert, false);
        }
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.addEventListener("click", () => {
            canvas.requestPointerLock();
            this.isLocked = true;
        })
    }

    private onLockChangeAlert() {
        if (document.pointerLockElement === this.canvas ||
            (document as any).mozPointerLockElement === this.canvas) {
            this.isLocked = true;
        } else {
            this.isLocked = false;
        } 
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

