import { UserControlsSystem } from "./control";
export declare class KeyboardState {
    controller: UserControlsSystem;
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
    r: boolean;
    f: boolean;
    q: boolean;
    e: boolean;
    ArrowUp: boolean;
    ArrowDown: boolean;
    ArrowLeft: boolean;
    ArrowRight: boolean;
    space: boolean;
    shift: boolean;
    ctrl: boolean;
    private keyUpCallbacks;
    private keyDownCallbacks;
    constructor(controller: UserControlsSystem);
    init(): void;
    addKeyUpHandler(callback: (evt: KeyboardEvent) => void): void;
    addKeyDownHandler(callback: (evt: KeyboardEvent) => void): void;
    onKeyDown(evt: KeyboardEvent): void;
    onKeyUp(evt: KeyboardEvent): void;
}
//# sourceMappingURL=keyboard.control.d.ts.map