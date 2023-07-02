import { useEffect } from "react";
import THREE from "three";
import { Universe } from "./universe";
import { debounce, debounceTime, fromEvent } from "rxjs";
import { calculateResponsiveDocumentState } from "./responsive-document";

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


        const resizeCanvasEvent = () => {
            if (resizeRendererToDisplaySize(renderer)) {
                // update the camera's aspect ratio and the renderer's size
                Universe.ctx3.camera.aspect = canvas.clientWidth / canvas.clientHeight;
                Universe.ctx3.camera.updateProjectionMatrix();
            }
        }

        window.addEventListener('resize', resizeCanvasEvent)

        // Create an observable from the window.resize event
        const $resize = fromEvent(window, 'resize');

        // Apply the debounceTime operator to the observable
        const $debouncedResize = $resize.pipe(debounceTime(300)); // Adjust the debounce time as per your needs (e.g., 300ms)

        const debounceResizeSub = $debouncedResize.subscribe(() => {
            Universe.state.resizing.$resize.next(true);
            Universe.state.responsiveDocument.$orientation.next(calculateResponsiveDocumentState())
        });

        return () => {
            window.removeEventListener('resize', resizeCanvasEvent);
            debounceResizeSub.unsubscribe();   
        }

    }, [])
    
    return (
        <>
        </>
    )
};

    