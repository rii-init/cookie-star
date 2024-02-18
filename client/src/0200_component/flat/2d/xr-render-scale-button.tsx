import { createElement } from "react";
import { settingsState } from "../../../0000/settings-state";
import { XR_RENDER_SCALE } from "../../../0000_concept/xr-render-scale";

export const XRRenderScaleButton = () => {

    return (
        <button className="ui_2d__button _2_glyph_icon" 
                style={{
                    fontSize: "1.4em",    
                    padding: "0.35vw"
                }}
                onClick={() => { 
                    settingsState.nextValue("xrRenderScale")
                }}
        >
            { XR_RENDER_SCALE[settingsState.controls.xrRenderScale.state] }
        </button>
    )
}