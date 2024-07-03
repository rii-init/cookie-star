type SettingsType = "aa" | "animation" | "visualTheme" | "xrRenderScale";

class Setting {
    constructor(
        public initial: number,
        public state:   number, 
        public range:   number
    ) {}
} 

export class SettingsState {
    
    constructor() {
        let   str_version    = localStorage.getItem("version");
        let       version    = str_version === null ? null : parseInt(str_version);
        const currentVersion = 10;

        localStorage.setItem("version", currentVersion.toString());

        for (let key in this.controls) {
            const localValue = localStorage.getItem(key);

            if (localValue === null || version != currentVersion) {
                this.controls[key as SettingsType].state 
              = this.controls[key as SettingsType].initial;
              
                localStorage.setItem(key, this.controls[key as SettingsType].state.toString());
            } else {
                this.controls[key as SettingsType].state = parseInt(localValue);
            }
        }
    }

    public controls = {
        xrRenderScale: new Setting(0, 0, 7),
        aa:            new Setting(1, 1, 2),
        animation:     new Setting(1, 1, 2),
        visualTheme:   new Setting(0, 0, 2),
    }
    
    nextValue(field: SettingsType) {
        this.controls[field].state = (this.controls[field].state + 1) 
                                   %  this.controls[field].range;

        localStorage.setItem(field, this.controls[field].state.toString());
        window.location.href=window.location.href;                                   
    }

    previewNextValue(field: SettingsType) {
        return (this.controls[field].state + 1) 
             %  this.controls[field].range;
    }
}


export const settingsState = new SettingsState();
