export interface ColorScheme {
    _foreground: string;
    _background: string;
    _background2: string;
    _accent: string;
    _accent2: string;
    _accent3: string;
}
export interface LightConditions {
    ambientLight: {
        intensity: number;
        color: string;
    };
    celestialLight: {
        intensity: number;
        color: string;
    };
}
export declare class VisualTheme implements ColorScheme {
    elements: any;
    constructor(colors: ColorScheme, lighting: LightConditions, elements: any);
    ambientLight: {
        intensity: number;
        color: string;
    };
    celestialLight: {
        intensity: number;
        color: string;
    };
    _foreground: string;
    _background: string;
    _background2: string;
    _accent: string;
    _accent2: string;
    _accent3: string;
    enable(): this;
    get foreground(): [number, number, number];
    get background(): [number, number, number];
    get background2(): [number, number, number];
    get accent(): [number, number, number];
    get accent2(): [number, number, number];
    get accent3(): [number, number, number];
    get ambientLightColor(): [number, number, number];
    get celestialLightColor(): [number, number, number];
}
//# sourceMappingURL=visual-theme.d.ts.map