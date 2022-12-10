import React from "react";
import { Flat } from "../[flat]";
import { InputProps } from "./InputSurface.props";

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
