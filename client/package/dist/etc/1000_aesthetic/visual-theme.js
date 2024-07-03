import { getRGB } from "./getRGB";
import { SyntaxHighlight } from "./syntax-highlight";
export class VisualTheme {
    constructor(colors, lighting, elements) {
        this.elements = elements;
        this.ambientLight = lighting.ambientLight;
        this.celestialLight = lighting.celestialLight;
        this._foreground = colors._foreground;
        this._background = colors._background;
        this._background2 = colors._background2;
        this._accent = colors._accent;
        this._accent2 = colors._accent2;
        this._accent3 = colors._accent3;
    }
    enable() {
        for (let key in this.elements) {
            SyntaxHighlight[key] = this.elements[key];
        }
        return this;
    }
    get foreground() {
        return getRGB(this._foreground);
    }
    get background() {
        return getRGB(this._background);
    }
    get background2() {
        return getRGB(this._background2);
    }
    get accent() {
        return getRGB(this._accent);
    }
    get accent2() {
        return getRGB(this._accent2);
    }
    get accent3() {
        return getRGB(this._accent3);
    }
    get ambientLightColor() {
        return getRGB(this.ambientLight.color);
    }
    get celestialLightColor() {
        return getRGB(this.celestialLight.color);
    }
}
//# sourceMappingURL=visual-theme.js.map