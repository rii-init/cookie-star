import { Camera, Scene } from "three";
export type CTX3 = {
    canvas: HTMLCanvasElement;
    scene: Scene;
    camera: Camera;
    xr: any;
} & {
    [key: string]: any;
};
export interface ThreeCTXProps {
    callback: (ctx: CTX3) => void;
}
export declare let ThreeJSContext: () => null;
//# sourceMappingURL=three-ctx.d.ts.map