import { DarkHighContrast } from "./themes/dark-high-contrast";
import { LightHighContrast } from "./themes/light-high-contrast";

const themes = [ 
    LightHighContrast,
    DarkHighContrast
];


let theme = parseInt(
        localStorage.getItem("visualTheme") || "0");

export function currentTheme() {
    return themes[theme];
}


function wrapNext(index: number, length: number): number {
    return (index + 1) % length;
}

let nextIcon = wrapNext(theme, themes.length);
 
export function VisualThemeManager() {
    
    
    const icons = ['☀','☽']
    

    function switchTheme(visualTheme: number): void {
        localStorage.setItem("visualTheme", visualTheme.toString());
        window.location.href=window.location.href;
    }

    function nextTheme() {
        switchTheme(wrapNext(theme, themes.length));
    }

    return (
        <input  type='button' className={'ui_2d__button visual-theme _'+theme}
                onClick={nextTheme} 
                value={icons[nextIcon]}
        />
    )

}