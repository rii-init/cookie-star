import { BehaviorSubject, Subject } from "rxjs";
import { Object3D } from "three";
export declare const stateManager: {
    cursor: {
        $activation: BehaviorSubject<number>;
        $parent: BehaviorSubject<Object3D<import("three").Event> | null>;
    };
    scrolling: {
        $distance: BehaviorSubject<number>;
        $scrollDomain: BehaviorSubject<number>;
        $position: BehaviorSubject<[number, number, number]>;
        $parent: BehaviorSubject<Object3D<import("three").Event> | null>;
    };
    resizing: {
        $resize: Subject<unknown>;
    };
    responsiveDocument: {
        $orientation: BehaviorSubject<"portrait" | "landscape">;
    };
};
//# sourceMappingURL=state-manager.d.ts.map