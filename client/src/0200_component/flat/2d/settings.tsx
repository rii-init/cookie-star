import { useState } from "react";
import { VisualThemeManager } from "../../../1000_aesthetic/visual-theme.manager";

export function Settings() {
    
    const [settingsOpen, settingsOpenSet] = useState(false);
    function settingsOpenToggle() {
        settingsOpenSet(!settingsOpen);
    }

    if (settingsOpen) {
        
        return (
            <div className="ui_2d__settings">
                <div className="ui_2d__settings__theme">
                    <VisualThemeManager />
                </div>
                <div className="ui_2d__settings__close">
                    <input type="button" value="Close" onClick={() => settingsOpenToggle()} />
                </div>
            </div>
        )
    }


    return (
        <input  type='button' className={'ui_2d__button visual-theme _'}
                onClick={() => settingsOpenToggle()} 
                value={"⚙"}
        />
    )


}