import { DarkLowContrast } from "./themes/dark-high-contrast";
import { LightHighContrast } from "./themes/light-high-contrast";

const themes = [ 
    LightHighContrast,
    DarkLowContrast
];


export const themeIdx = parseInt(
        localStorage.getItem("visualTheme") || "0");

export function currentTheme() {
    return themes[themeIdx].enable();
}


function wrapNext(index: number, length: number): number {
    return (index + 1) % length;
}


function switchTheme(visualTheme: number): void {
    localStorage.setItem("visualTheme", visualTheme.toString());
    window.location.href=window.location.href;
}

function nextTheme() {
    switchTheme(wrapNext(themeIdx, themes.length));
}


let nextIcon = wrapNext(themeIdx, themes.length);
 





export function VisualThemeManager() {
    
    
    const modeChanges = ['☀','☽']
    
    return (
        <input  type='button' className={'ui_2d__button visual-theme _'+themeIdx}
                onClick={nextTheme} 
                value={modeChanges[nextIcon]}
        />
    )

}