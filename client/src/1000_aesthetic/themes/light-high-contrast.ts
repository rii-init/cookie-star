import { ColorScheme, VisualTheme } from "../visual-theme";

export const LightHighContrast = new VisualTheme(
    {
        _foreground:  "#172027",
        _background:  "#3db2ff",
        _background2: "#ffffff",
        _accent:      "#ffd65c",
        _accent2:     "#a985ff",
        _accent3:     "#6b00a5",
    },
    {
        ambientLight:   { 
                intensity: 0.6, 
                color: "#cee9ff" 
        },
        celestialLight: { 
                intensity: 1.3, 
                color: "#ffffff" 
        }   
    })