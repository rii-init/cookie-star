import { Mesh, Scene } from "three";
import { VisualTheme } from "../1000_aesthetic/visual-theme";
/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  OwO  <3
 *⭐        🌟🧋
 */
export declare class Universe {
    static xrMode: boolean;
    static xr: any;
    static gl: any;
    static scene: Scene;
    static ctx3: any;
    static canvas: any;
    static net_transport: any;
    static state: {
        cursor: {
            $activation: import("rxjs").BehaviorSubject<number>;
            $parent: import("rxjs").BehaviorSubject<import("three").Object3D<import("three").Event> | null>;
        };
        scrolling: {
            $distance: import("rxjs").BehaviorSubject<number>;
            $scrollDomain: import("rxjs").BehaviorSubject<number>;
            $position: import("rxjs").BehaviorSubject<[number, number, number]>;
            $parent: import("rxjs").BehaviorSubject<import("three").Object3D<import("three").Event> | null>;
        };
        resizing: {
            $resize: import("rxjs").Subject<unknown>;
        };
        responsiveDocument: {
            $orientation: import("rxjs").BehaviorSubject<"portrait" | "landscape">;
        };
    };
    static colors: VisualTheme;
    static skyColor: [number, number, number];
    static skyColor2: [number, number, number];
    static sky: Mesh | null;
}
//# sourceMappingURL=universe.d.ts.map