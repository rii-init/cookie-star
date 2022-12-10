import { IOSurface } from "../../../idea/io+surface";

export interface InputProps<V = string> extends IOSurface {
    onChange: (value: V) => void;
    variant:  "text" | "number" | "boolean";
    label?:      string;
    value?:           V;
    channelId?:  string;
}
