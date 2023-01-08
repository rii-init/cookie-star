import { useThree } from "@react-three/fiber";
import { Canvas } from '@react-three/fiber';
import { Camera, Scene } from "three";

export type CTX3 = { 
    canvas: HTMLCanvasElement, 
    scene:  Scene, 
    camera: Camera 
} & { [key: string]: any };

export interface ThreeCTXProps {
    callback: (ctx: CTX3) => void;
}

export let ThreeJSContext = function(props: ThreeCTXProps) {
    const ctx_three = useThree() as CTX3;
    
    props?.callback(ctx_three);
    
    return null;
}