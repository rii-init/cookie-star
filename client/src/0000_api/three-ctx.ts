import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from '@react-three/fiber';
import { useXR } from "@react-three/xr";
import { Camera, Raycaster, Scene, Vector2 } from "three";
import { Universe } from "../0000_concept/universe";
import { UserControls } from "../0700_life/control/control";

export type CTX3 = { 
    canvas: HTMLCanvasElement, 
    scene:  Scene, 
    camera: Camera 
    xr: any,
} & { [key: string]: any };

export interface ThreeCTXProps {
    callback: (ctx: CTX3) => void;
}

export let ThreeJSContext = function() {
    const ctx = useThree() as CTX3;
    Universe.ctx3 = ctx;
                    
    ctx.gl.setPixelRatio(window.devicePixelRatio || 1)
    Universe.canvas = document.querySelector("#r3f-canvas");
    Universe.user_controls = new UserControls(Universe.ctx3) 

    useFrame((state, delta, xrFrame) => {
      if (Universe.user_controls) {
        Universe.user_controls.update(delta);
      }
      state.raycaster.setFromCamera(new Vector2(0,0), state.camera);
    })
    
    return null;
}