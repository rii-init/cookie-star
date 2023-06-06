import { useEffect } from "react";


export const AnimationButton = () => {

    
    const modeChanges = ["▣", "▶"] 


    return (
        <div className="ui_2d__button">
            <input type="button" value={
                    // modeChanges[settings.animation]
                    modeChanges[0]
            } 
              className="_2_glyph_icon"  
                  style={{
                        fontSize: "1.4em",    
                        padding: "0.35vw"
                    }}
                  onClick={() => { 
                    // settings.nextValue("animation")
                  }}
            />
        </div>
    );

}


