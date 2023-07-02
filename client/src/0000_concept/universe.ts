import { Group, Mesh, Object3D } from "three";
import { UserControls } from "../0700_life/control/control";
import { LivingUwU } from "../0700_life/living_uwu";
import { VisualTheme }      from "../1000_aesthetic/visual-theme";
import { currentTheme } from "../1000_aesthetic/visual-theme.manager";
import { Magnetism } from "../0700_life/physical/magnetism";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { stateManager } from "./state-manager";

/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  UwU  <3 <3 <3
 *⭐        🌟🧋
 */ 
export class Universe { 

    public static colors: VisualTheme = currentTheme();
    public static skyColor  = Universe.colors.background;
    public static skyColor2 = Universe.colors.background2;
    public static sky: Mesh | null = null;

    public static xrMode:    boolean = false;
    public static xr:        any;
    
    public static ctx3:      any; 
    public static canvas:    any;

    public static magnetism  = new Magnetism();

    public static net_transport: any;
    public static user_controls: UserControls;
    public static user:          LivingUwU;

    public static state = stateManager
}
