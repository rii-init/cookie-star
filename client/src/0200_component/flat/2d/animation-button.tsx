import { useEffect } from "react";
import { settingsState } from "../../../0000/settings-state";


export const AnimationButton = () => {
    
    const modeChanges = ["▶", "▣"] 

    return (
        <div className="ui_2d__button">
            <input type="button" value={
                    modeChanges[settingsState.controls.animation.state]
            } 
              className="_2_glyph_icon"  
                  style={{
                        fontSize: "1.4em",    
                        padding: "0.35vw"
                    }}
                  onClick={() => { 
                    settingsState.nextValue("animation")
                  }}
            />
        </div>
    );

}


