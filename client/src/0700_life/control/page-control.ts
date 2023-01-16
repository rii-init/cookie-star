import { Camera, Euler, Matrix4 } from "three";
import { ScrollControl } from "./scroll.control";

export class PageControl {
    public static scroll = 0;
    public static lastScroll = 0;
    public static scrollControl: ScrollControl;
}