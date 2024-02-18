import { settingsState } from "../0000/settings-state";
import { DarkLowContrast } from "./themes/dark-high-contrast";
import { LightHighContrast } from "./themes/light-high-contrast";

const themes = [ 
    LightHighContrast,
    DarkLowContrast
];


export const themeIdx = settingsState.controls.visualTheme.state;


export function currentTheme() {
    return themes[themeIdx].enable();
}


export function VisualThemeManager() {
    
    const modeChanges = ['☀','☽']
    
    return (
        <button className={'ui_2d__button visual-theme _'+themeIdx}
                onClick={ () => settingsState.nextValue("visualTheme") } 
        >
            {modeChanges[settingsState.previewNextValue("visualTheme")]}
        </button>
    )

}