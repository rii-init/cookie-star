import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { KeyboardState, onKeyDown, onKeyUp } from "./keyboard.control";

export interface UserControlsProps {
    callback: (ctx: any) => void;
}

export class MotorCortex {
    
    public static isLocked: boolean = false;
    public static keys = new KeyboardState();
    
}

export let UserControls = function(props: UserControlsProps) {

    useEffect(()=>{
        document.addEventListener("keydown", (evt) => onKeyDown(evt))
        document.addEventListener("keyup", (evt)   => onKeyUp(evt))
    }, [])
    

    const controlsRef = useRef();
    const isLocked = useRef(false);
    
    useFrame(() => {
    
        
        
    })

}