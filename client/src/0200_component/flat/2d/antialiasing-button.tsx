import { settingsState } from "../../../0000/settings-state";

export const AntialiasingButton = () => {

    const modeChanges = ["◣", "█▄"]

    return (
        <button className="ui_2d__button _2_glyph_icon" 
            style={
                !settingsState.controls.aa ? {fontSize: "12pt !important"} : {}
            } 
            onClick={() => {
                settingsState.nextValue("aa")  
            }}
        >
            {modeChanges[settingsState.controls.aa.state]}
        </button>
    );

}