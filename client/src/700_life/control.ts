import { PointerLockControls } from "@react-three/drei";
import { Universe } from "../000_concept/universe";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export interface UserControlsProps {
    callback: (ctx: any) => void;
}

export class MotorCortex {
    
    public static isLocked: boolean = false;
    public static keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        space: false,
        shift: false,
        ctrl: false
    }
    
}

export let UserControls = function(props: UserControlsProps) {

    const controlsRef = useRef();
    const isLocked = useRef(false);
    
    useFrame(() => {
    
        
    
    })

}