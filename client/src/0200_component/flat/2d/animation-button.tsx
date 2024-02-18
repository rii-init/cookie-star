import { useEffect } from "react";
import { settingsState } from "../../../0000/settings-state";


export const AnimationButton = () => {

  const modeChanges = ["▶", "▣"]

  return (
    <button className="ui_2d__button _2_glyph_icon"
      style={{
        fontSize: "1.4em",
        padding: "0.35vw"
      }}
      onClick={() => {
        settingsState.nextValue("animation")
      }}
    >
      {modeChanges[settingsState.controls.animation.state]}
    </button>
  );

}


