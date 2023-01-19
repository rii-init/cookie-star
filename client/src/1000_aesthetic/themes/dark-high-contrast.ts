import { VisualTheme } from "../visual-theme";


export const DarkHighContrast = new VisualTheme(
    { 
        _foreground:  "#ffffff",
        _background:  "#000017",
        _background2: "#1f002f",
        _accent:      "#32004c",
        _accent2:     "#500054",
        _accent3:     "#ffc400",
    },
    {
        ambientLight:   { 
                intensity: 0.5, 
                color: "#e5ceff" 
        },
        celestialLight: { 
                intensity: 0.8, 
                color: "#ffffbb" 
        }   
    }
);

