import { useEffect } from "react";
import THREE from "three";
import { Universe } from "./universe";

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = document.querySelector("#r3f-canvas canvas") as HTMLCanvasElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

export const ResizeCanvas = () => {

    useEffect(()=>{
        const canvas = document.querySelector('#r3f-canvas') as HTMLCanvasElement;
        const renderer = Universe.ctx3.renderer;

        window.addEventListener('resize', () => {
        if (resizeRendererToDisplaySize(renderer)) {
            // update the camera's aspect ratio and the renderer's size
            Universe.ctx3.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            Universe.ctx3.camera.updateProjectionMatrix();
        }
        })

    }, [])
    
    return (
        <>
        </>
    )
};

    