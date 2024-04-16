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

    public static xrMode:    boolean = false;
    public static xr:        any;
    
    public static gl:        any;
    public static scene:     Scene;
    public static ctx3:      any; 
    public static canvas:    any;

    // refactor this into NetworkSystem
    public static net_transport: any;
    
    public static state = stateManager;
    public static colors: VisualTheme = currentTheme();

    // refactor this into a SkySystem
    public static skyColor  = Universe.colors.background;
    public static skyColor2 = Universe.colors.background2;
    public static sky: Mesh | null = null;
}
