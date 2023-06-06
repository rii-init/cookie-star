import { useState } from "react";
import { VisualThemeManager } from "../../../1000_aesthetic/visual-theme.manager";
import { AntialiasingButton } from "./antialiasing-button";
import { AnimationButton } from "./animation-button";

export function Settings() {
    
    const [settingsOpen, settingsOpenSet] = useState(false);
    function settingsOpenToggle() {
        settingsOpenSet(!settingsOpen);
    }

    if (settingsOpen) {
        
        return (
            <div className="ui_2d__settings table"
                style={{backgroundColor: '#ffffff'}}>
                <div className="row">
                    <div className="cell">
                        <VisualThemeManager />
                    </div>
                    <div className="cell">
                        Lighting
                    </div>
                    <div className="cell">
                        <input  type="button" 
                                value="✕" 
                                onClick={() => settingsOpenToggle()} 
                                className="ui_2d__button"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                        <AntialiasingButton />
                    </div>
                    <div className="cell">
                        Quality
                    </div>
                    <div className="cell">
                    </div>
                </div>
                <div className="row">
                    <div className="cell">
                        <AnimationButton />
                    </div>
                    <div className="cell">
                        Animation
                    </div>
                    <div className="cell">

                    </div>
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