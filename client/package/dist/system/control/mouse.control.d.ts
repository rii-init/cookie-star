import { UserControlsSystem } from "./control";
export declare class MouseState {
    controller: UserControlsSystem;
    leftButton: boolean;
    rightButton: boolean;
    dx: number;
    dy: number;
    isLocked: boolean;
    canvas: HTMLCanvasElement | null;
    private handlers;
    constructor(controller: UserControlsSystem);
    addHandler(name: string, handler: (state: MouseState) => void): void;
    init(): void;
    setCanvas(canvas: HTMLCanvasElement): void;
    private onLockChangeAlert;
    private setLocked;
    private onMouseMove;
    private onMouseDown;
    private onMouseUp;
}
//# sourceMappingURL=mouse.control.d.ts.map