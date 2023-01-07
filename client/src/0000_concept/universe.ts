import { PerspectiveCamera } from "three";
import { UserCTL } from "../0700_life/control/control";
import { LivingUwU } from "../0700_life/living_uwu";
import { VisualTheme }      from "../1000_aesthetic/color-scheme";
import { DarkHighContrast } from "../1000_aesthetic/scheme/dark-high-contrast";
import { LightHighContrast } from "../1000_aesthetic/scheme/light-high-contrast";
import { Ego } from "./ego";

/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  UwU  <3 <3 <3
 *⭐        🌟🧋
 */ 
export class Universe { 

    public static Love() { }

    public static colors: VisualTheme = LightHighContrast;
    
    public static ctx3:          any; 
    public static canvas:        any;

    public static net_transport: any;
    public static user_controls: UserCTL;
    public static user:          LivingUwU;
}