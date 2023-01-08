import { Universe } from "../0000_concept/universe";
import { DarkHighContrast } from "./themes/dark-high-contrast";
import { LightHighContrast } from "./themes/light-high-contrast";
import { VisualTheme } from "./visual-theme";

export let theme = 0;
export function VisualThemeManager() {
    
    const themes = [ 
        LightHighContrast,
        DarkHighContrast
    ];
    
    function switchTheme(visualTheme: VisualTheme): void {
        Universe.colors = visualTheme;
    }

    function nextTheme() {
        theme = themes.indexOf(Universe.colors) + 1;

        if (theme >= themes.length) {
            theme = 0;
        }

        switchTheme(themes[theme]);
    }

    return (
        <input  type='button' className={'visual-theme theme'+theme}
                onClick={() => nextTheme()} 
                value={"theme "+theme}
        />
    )

}