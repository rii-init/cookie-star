import { Mesh, Scene } from "three";
import { UserControls } from "../0700_life/control/control";
import { VisualTheme }      from "../1000_aesthetic/visual-theme";
import { currentTheme } from "../1000_aesthetic/visual-theme.manager";
import { stateManager } from "./state-manager";
import { initSystems } from "../0700_life/system";

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

    public static net_transport: any;
    public static user_controls: UserControls;

    public static system = initSystems();
    
    public static state = stateManager
}
