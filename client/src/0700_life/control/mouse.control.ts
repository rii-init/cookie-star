export class MouseState {
    public leftButton  = false;
    public rightButton = false;

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
    }

    public onMouseDown(evt: MouseEvent) {
        switch (evt.button) {
            case 0: this.leftButton  = true; break;
            case 2: this.rightButton = true; break;
        }

        for (const idx in this.handlers) {
            this.handlers[idx](this);
        }
        
    }

    public onMouseUp(evt: MouseEvent) {
        switch (evt.button) {
            case 0: this.leftButton  = false; break;
            case 2: this.rightButton = false; break;
        }
    }    
}

