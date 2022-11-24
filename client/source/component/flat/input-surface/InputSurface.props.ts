import { IOSurface } from "../../idea/io+surface";

export interface InputProps<V = string> extends IOSurface {
    onChange: (value: V) => void;
    label?:  string;
    value?:       V;
}
