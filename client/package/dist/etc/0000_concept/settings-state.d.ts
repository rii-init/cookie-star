type SettingsType = "aa" | "animation" | "visualTheme" | "xrRenderScale";
declare class Setting {
    initial: number;
    state: number;
    range: number;
    constructor(initial: number, state: number, range: number);
}
export declare class SettingsState {
    constructor();
    controls: {
        xrRenderScale: Setting;
        aa: Setting;
        animation: Setting;
        visualTheme: Setting;
    };
    nextValue(field: SettingsType): void;
    previewNextValue(field: SettingsType): number;
}
export declare const settingsState: SettingsState;
export {};
//# sourceMappingURL=settings-state.d.ts.map