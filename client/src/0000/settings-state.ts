type SettingsType = "aa" | "animation" | "visualTheme";

class Setting {
    constructor(
        public initial: number,
        public state:   number, 
        public range:   number
    ) {}
} 

export class SettingsState {
    
    constructor() {
        for (let key in this.controls) {
            const localValue = localStorage.getItem(key);

            if (localValue === null) {
                this.controls[key as SettingsType].state 
              = this.controls[key as SettingsType].initial;
                
            } else {
                this.controls[key as SettingsType].state = parseInt(localValue);
            }
        }
    }

    public controls = {
        aa:          new Setting(1, 1, 2),
        animation:   new Setting(1, 1, 2),
        visualTheme: new Setting(0, 0, 2),
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
