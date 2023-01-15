export class MouseState {
    public leftButton  = false;
    public rightButton = false;
    private x = 0;
    private y = 0;
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
            document.addEventListener('pointerlockchange', () => this.onLockChangeAlert(), false);
        } else if ("onmozpointerlockchange" in document) {
            (document as any).addEventListener('mozpointerlockchange', this.onLockChangeAlert, false);
        }
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        canvas.addEventListener("click", () => {
            if (Math.abs(this.x - (window.innerWidth / 2))
                  < (window.innerWidth / 10)
             && Math.abs(this.y - (window.innerHeight / 2))
                  < (window.innerHeight / 10)
                ) {
            
                canvas.requestPointerLock();
                this.setLocked(true );
            }

        })
    }

    private onLockChangeAlert() {
        if (document.pointerLockElement === this.canvas ||
            (document as any).mozPointerLockElement === this.canvas) {
            this.setLocked(true);
        } else {
            this.setLocked(false)
        } 
    }

    private setLocked(isLocked: boolean) {
        this.isLocked = isLocked;
    }

    private onMouseMove(evt: MouseEvent) {
        if (this.isLocked) {
            this.x = evt.clientX;
            this.y = evt.clientY;
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

