import { VisualTheme } from "../visual-theme";


export const DarkHighContrast = new VisualTheme(
    { 
        _foreground:  "#ffffff",
        _background:  "#15002a",
        _background2: "#1f002f",
        _accent:      "#ffd727",
        _accent2:     "#aa60ff",
        _accent3:     "#ae00ff",
    },
    {
        ambientLight:   { 
                intensity: 0.5, 
                color: "#5010ff" 
        },
        celestialLight: { 
                intensity: 1.2, 
                color: "#c94bff" 
        }   
    }
);

