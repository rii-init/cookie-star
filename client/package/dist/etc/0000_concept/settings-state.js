class Setting {
    constructor(initial, state, range) {
        this.initial = initial;
        this.state = state;
        this.range = range;
    }
}
export class SettingsState {
    constructor() {
        this.controls = {
            xrRenderScale: new Setting(0, 0, 7),
            aa: new Setting(1, 1, 2),
            animation: new Setting(1, 1, 2),
            visualTheme: new Setting(0, 0, 2),
        };
        let str_version = localStorage.getItem("version");
        let version = str_version === null ? null : parseInt(str_version);
        const currentVersion = 10;
        localStorage.setItem("version", currentVersion.toString());
        for (let key in this.controls) {
            const localValue = localStorage.getItem(key);
            if (localValue === null || version != currentVersion) {
                this.controls[key].state
                    = this.controls[key].initial;
                localStorage.setItem(key, this.controls[key].state.toString());
            }
            else {
                this.controls[key].state = parseInt(localValue);
            }
        }
    }
    nextValue(field) {
        this.controls[field].state = (this.controls[field].state + 1)
            % this.controls[field].range;
        localStorage.setItem(field, this.controls[field].state.toString());
        window.location.href = window.location.href;
    }
    previewNextValue(field) {
        return (this.controls[field].state + 1)
            % this.controls[field].range;
    }
}
export const settingsState = new SettingsState();
//# sourceMappingURL=settings-state.js.map