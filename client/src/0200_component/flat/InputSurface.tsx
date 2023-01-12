import { Flat } from "../../0100_element/x00_flat/[flat]";

import { IOSurface } from "../../0000_concept/io+surface";

export interface InputProps<V = string> extends IOSurface {
    onChange: (value: V) => void;
    variant:  "text" | "number" | "boolean";
    label?:      string;
    value?:           V;
    channelId?:  string;
}


export function InputSurface(props: InputProps) {
    const surface_uuid = props?.channelID || ""+Math.random(); // || newUID();
    
    return (
        <Flat>
            <div className="input-surface">
                <input id={surface_uuid} 
                     type={props?.variant} 
                 onChange={(evt) => props.onChange(evt.target.value) } 
                />
                <label htmlFor={surface_uuid}>
                    {props.label}
                </label>
            </div>
        </Flat>
    );

};
