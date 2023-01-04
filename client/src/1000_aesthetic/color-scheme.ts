export interface ColorScheme {
    _foreground: string;    
    _background: string;
    _accent:     string;
    _accent2:    string;
    _accent3:    string;
}

export class VisualTheme implements ColorScheme {
    
    constructor(colors: ColorScheme) {
        this._foreground = colors._foreground;
        this._background = colors._background;
        this._accent = colors._accent;
        this._accent2 = colors._accent2;
        this._accent3 = colors._accent3;
    }

    private getRGB(hexColor: string): [number, number, number] {
        return  (
                    hexColor.split("")
                            .slice(1 )
                            .join("" )
                            .match(/[0-9a-f]{2}/g) || []
                )            
                .map((v: string) => parseInt(v, 16)) as [number, number, number]
    }

    _foreground: string;    
    _background: string;
    _accent:     string;
    _accent2:    string;
    _accent3:    string;

    get foreground(): [number, number, number] {
        return this.getRGB(this._foreground)
    }
    get background(): [number, number, number] {
        return this.getRGB(this._background)
    }
    get accent(): [number, number, number] {
        return this.getRGB(this._accent)
    }
    get accent2(): [number, number, number] {
        return this.getRGB(this._accent2)
    }
    get accent3(): [number, number, number] {
        return this.getRGB(this._accent3)
    }
}
