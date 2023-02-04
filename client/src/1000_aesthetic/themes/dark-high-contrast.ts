import { DarkSyntaxHighlight } from "./syntax-highlight.dark";
import { VisualTheme } from "../visual-theme";


export const DarkLowContrast = new VisualTheme(
    { 
        _foreground:  "#ffffff",
        _background:  "#fc9ce8",
        _background2: "#ffb862",
        _accent:      "#ffd727",
        _accent2:     "#aa60ff",
        _accent3:     "#ae00ff",
    },
    {
        ambientLight:   { 
                intensity: 0.5, 
                color: "#cc94f7" 
        },
        celestialLight: { 
                intensity: 1.2, 
                color: "#f5acf5" 
        }   
    },
    new DarkSyntaxHighlight()
);
