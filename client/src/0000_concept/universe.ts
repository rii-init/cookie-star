import { Mesh, Scene } from "three";
import { UserControlsSystem } from "../0700_life/system/control/control";
import { VisualTheme }      from "../1000_aesthetic/visual-theme";
import { currentTheme } from "../1000_aesthetic/visual-theme.manager";
import { stateManager } from "./state-manager";

/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  OwO  <3 
 *⭐        🌟🧋
 */ 
export class Universe { 

    public static colors: VisualTheme = currentTheme();
    public static skyColor  = Universe.colors.background;
    public static skyColor2 = Universe.colors.background2;
    public static sky: Mesh | null = null;

    public static xrMode:    boolean = false;
    public static xr:        any;
    
    public static gl:        any;
    public static scene:     Scene;
    public static ctx3:      any; 
    public static canvas:    any;

    // refactor these into UserSystem as next task
    public static net_transport: any;
    public static user_controls: UserControlsSystem;
    
    public static state = stateManager
}
