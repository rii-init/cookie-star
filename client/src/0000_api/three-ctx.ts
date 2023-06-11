import { useFrame, useThree } from "@react-three/fiber";


import { Camera, Raycaster, Scene, Vector2 } from "three";
import { Universe } from "../0000_concept/universe";
import { UserControls } from "../0700_life/control/control";
import { useEffect } from "react";
import { xRControllerState } from "../0700_life/control/climbing-controls";
import { useController } from "@react-three/xr";


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
    Universe.user_controls = new UserControls(Universe.ctx3);
    Universe.magnetism.setCamera(Universe.ctx3.camera);

    useEffect(() => {
      Universe.state.cursor.$parent.next(Universe.ctx3.camera);
    }, [])
    
    useFrame((state, delta, xrFrame) => {
      if (Universe.user_controls) {
        Universe.user_controls.update(delta);
      }
      
    })
    
    return null;
}
