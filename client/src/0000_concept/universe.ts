import { UserControls } from "../0700_life/control/control";
import { LivingUwU } from "../0700_life/living_uwu";
import { SyntaxHighlight } from "../1000_aesthetic/syntax-highlight";
import { VisualTheme }      from "../1000_aesthetic/visual-theme";
import { currentTheme } from "../1000_aesthetic/visual-theme.manager";

/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  UwU  <3 <3 <3
 *⭐        🌟🧋
 */ 
export class Universe { 

    public static Love() { }

    public static colors: VisualTheme = currentTheme();
    public static skyColor = Universe.colors.background;

    public static xrMode: boolean = false;
    public static xr:            any;
    public static ctx3:          any; 
    public static canvas:        any;

    public static net_transport: any;
    public static user_controls: UserControls;
    public static user:          LivingUwU;
}