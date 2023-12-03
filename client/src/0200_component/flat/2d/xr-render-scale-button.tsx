import { createElement } from "react";
import { settingsState } from "../../../0000/settings-state";

export const XRRenderScaleButton = () => {
    const modeChanges = [0.5, 0.75, 0.8, 1, 1.25, 1.5, 2];
    
    return (createElement("div", { className: "ui_2d__button" },
        createElement("input", { 
            type: "button", 
            value: modeChanges[settingsState.controls.xrRenderScale.state],
            className: "_2_glyph_icon", 
            style: {
                fontSize: "1.4em",
                padding: "0.35vw"
            }, onClick: () => {
                settingsState.nextValue("xrRenderScale");
            } 
        })));
}