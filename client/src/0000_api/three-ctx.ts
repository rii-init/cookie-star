import { useFrame, useThree } from "@react-three/fiber";


import { Camera, Scene } from "three";
import { Universe } from "../0000_concept/universe";
import { UserControls } from "../0700_life/control/control";
import { useEffect, useState } from "react";
import { System, SystemUpdateSequence } from "../0700_life/system";


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
    Universe.scene = ctx.scene;
    Universe.ctx3  = ctx; 
    Universe.gl    = ctx.gl;             
    ctx.gl.setPixelRatio(window.devicePixelRatio || 1)
    Universe.canvas = document.querySelector("#r3f-canvas");
    Universe.user_controls = new UserControls(Universe.ctx3);

    useEffect(() => {
      Universe.state.cursor.$parent.next(Universe.ctx3.camera);
      Universe.state.scrolling.$parent.next(Universe.ctx3.camera);
      Universe.state.scrolling.$position.next([0,0,0] as [number,number,number]);
    }, [])
    
    useFrame((state, delta, xrFrame) => {
      // bespoke entity behavior update:

      if (Universe.user_controls) {
        Universe.user_controls.update(delta);
      }

      if (Universe.sky) {
        const cameraPosition = Universe.ctx3.camera.matrix.elements.slice(12, 15);
        
        Universe.sky.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
      }
      
      
      // update generic entities + systems:
      for (let i = 0; i < SystemUpdateSequence.length; i++) {
        SystemUpdateSequence[i].update(delta, System);
      }
      
    })

    
    return null;
}
