import { Ego } from "./ego";

export interface Self<Control> extends Ego {
    control: Control;
}