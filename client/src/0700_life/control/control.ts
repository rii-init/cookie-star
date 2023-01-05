import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { KeyboardState } from "./keyboard.control";
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

        MotorCortex.keys.init();
        MotorCortex.mouse.init();
    
    }, [])
    
    useFrame((ctx3) => {
    
            console.log("useFrame()", ctx3);

    })

}