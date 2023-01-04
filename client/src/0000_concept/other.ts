import { Ego } from "./ego";

export interface Other<Control> extends Ego {
    name:    string;
    control: Control;
}