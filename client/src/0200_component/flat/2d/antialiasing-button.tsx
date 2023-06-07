import { settingsState } from "../../../0000/settings-state";

export const AntialiasingButton = () => {

    const modeChanges = ["█▄", "◣"]

    return (
        <div className="ui_2d__button">
            <input type="button" value={modeChanges[settingsState.controls.aa.state]} 
              className="_2_glyph_icon"
                style={
                    !settingsState.controls.aa ? {fontSize: "12pt !important"} : {}
                } 
                onClick={() => {
                    settingsState.nextValue("aa")  
                }}
            />
        </div>
    );

}