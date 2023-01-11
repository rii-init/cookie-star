import { Universe } from "../0000_concept/universe";
import { DarkHighContrast } from "./themes/dark-high-contrast";
import { LightHighContrast } from "./themes/light-high-contrast";
import { VisualTheme } from "./visual-theme";

export let theme = 0;
export let nextIcon = 1;

export function VisualThemeManager() {
    
    const themes = [ 
        LightHighContrast,
        DarkHighContrast
    ];
    
    const icons = ['☀','☽']
    

    function switchTheme(visualTheme: VisualTheme): void {
        Universe.colors = visualTheme;
    }

    function nextTheme() {
        console.log("nextTheme");
        theme = themes.indexOf(Universe.colors) + 1;
        console.log("theme")
        nextIcon = theme + 1

        if (nextIcon >= icons.length) {
            nextIcon = 0;
        }

        if (theme >= themes.length) {
            theme = 0;
        }

        switchTheme(themes[theme]);
    }

    return (
        <input  type='button' className={'ui_2d__button visual-theme '}
                onClick={nextTheme} 
                value={icons[nextIcon]}
        />
    )

}