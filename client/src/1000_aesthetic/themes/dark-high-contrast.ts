import { DarkSyntaxHighlight } from "./syntax-highlight.dark";
import { VisualTheme } from "../visual-theme";


export const DarkLowContrast = new VisualTheme(
    { 
        _foreground:  "#ffffff",
        _background:  "#7d0062",
        _background2: "#ffc400",
        _accent:      "#ffe054",
        _accent2:     "#37145f",
        _accent3:     "#49006b",
    },
    {
        ambientLight:   { 
                intensity: 1.9, 
                color: "#7b1656" 
        },
        celestialLight: { 
                intensity: 1.4, 
                color: "#ddb6ff" 
        }   
    },
    new DarkSyntaxHighlight()
);
