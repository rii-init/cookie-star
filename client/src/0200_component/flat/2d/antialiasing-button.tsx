export const AntialiasingButton = () => {

    const modeChanges = ["█▄", "◣"]

    return (
        <div className="ui_2d__button">
            <input type="button" value="█▄" 
              className="_2_glyph_icon"
                style={{}
                    // !settings.aa ? {fontSize: "12pt !important"} : {}
                } 
                onClick={() => {
                    // settings.nextValue("aa")  
                }}
            />
        </div>
    );

}