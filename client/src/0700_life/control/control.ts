import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { KeyboardState, onKeyDown, onKeyUp } from "./keyboard.control";
import { MouseState } from "./mouse.control";

export interface UserControlsProps {
    callback: (ctx: any) => void;
}

export class MotorCortex {
    public static mouse = new MouseState();
    public static keys  = new KeyboardState();
}

export let UserControls = function(props: UserControlsProps) {

    useEffect(()=>{

        document.addEventListener("keydown", (evt) => onKeyDown(evt))
        document.addEventListener("keyup",   (evt) => onKeyUp(evt))
    
        

    }, [])
    
    useFrame(() => {
    
        

    })

}