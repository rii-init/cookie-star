import { Mesh } from "three";
import { UserControls } from "../0700_life/control/control";
import { LivingUwU } from "../0700_life/living_uwu";
import { VisualTheme }      from "../1000_aesthetic/visual-theme";
import { currentTheme } from "../1000_aesthetic/visual-theme.manager";
import { Magnetism } from "../0700_life/physical/magnetism";

/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  UwU  <3 <3 <3
 *⭐        🌟🧋
 */ 
export class Universe { 

    public static Love() { }

    public static colors: VisualTheme = currentTheme();
    public static skyColor = Universe.colors.background;
    public static sky: Mesh | null = null;

    public static attachCursorToCamera?:   Function;
    public static removeCursorFromCamera?: Function;

    public static xrControllers?: any[];
    public static xrMode: boolean = false;
    public static xr:            any;
    
    public static ctx3:          any; 
    public static canvas:        any;

    public static magnetism  = new Magnetism();

    public static net_transport: any;
    public static user_controls: UserControls;
    public static user:          LivingUwU;
}
