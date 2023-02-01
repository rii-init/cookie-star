import { getRGB } from "./getRGB";
import { SyntaxHighlight } from "./syntax-highlight";

export interface ColorScheme {
    _foreground:  string;

    _background:  string;
    _background2: string;
    
    _accent:      string;
    _accent2:     string;
    _accent3:     string;
}

export interface LightConditions {
    ambientLight:   { intensity: number, color: string }; 
    celestialLight: { intensity: number, color: string };
}

export class VisualTheme implements ColorScheme {
    
    constructor(colors: ColorScheme, lighting: LightConditions, public elements: any) {
        this.ambientLight = lighting.ambientLight;
        this.celestialLight = lighting.celestialLight;
        
        this._foreground = colors._foreground;
        this._background = colors._background;
        this._background2 = colors._background2;
        this._accent = colors._accent;
        this._accent2 = colors._accent2;
        this._accent3 = colors._accent3;
    }

    ambientLight:   { intensity: number, color: string };
    celestialLight: { intensity: number, color: string };

    _foreground:  string;

    _background:  string;
    _background2: string;

    _accent:     string;
    _accent2:    string;
    _accent3:    string;

    public enable() {

        for (let key in this.elements) {
            (SyntaxHighlight as any)[key] = this.elements[key];
        }

        return this;
    }

    get foreground(): [number, number, number] {
        return getRGB(this._foreground)
    }
    get background(): [number, number, number] {
        return getRGB(this._background)
    }
    get background2(): [number, number, number] {
        return getRGB(this._background2)
    }
    get accent(): [number, number, number] {
        return getRGB(this._accent)
    }
    get accent2(): [number, number, number] {
        return getRGB(this._accent2)
    }
    get accent3(): [number, number, number] {
        return getRGB(this._accent3)
    }

    get ambientLightColor(): [number, number, number] {
        return getRGB(this.ambientLight.color)
    }

    get celestialLightColor(): [number, number, number] {
        return getRGB(this.celestialLight.color)
    }
    
}
