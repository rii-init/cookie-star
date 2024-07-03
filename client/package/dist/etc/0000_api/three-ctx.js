import { useFrame, useThree } from "@react-three/fiber";
import { Universe } from "../0000_concept/universe";
import { useEffect } from "react";
import { systems } from "../../system";
export let ThreeJSContext = function () {
    var _a;
    const ctx = useThree();
    Universe.scene = ctx.scene;
    Universe.ctx3 = ctx;
    Universe.gl = ctx.gl;
    ctx.gl.setPixelRatio(window.devicePixelRatio || 1);
    Universe.canvas = document.querySelector("#r3f-canvas");
    (_a = systems.byComponent.UserControls) === null || _a === void 0 ? void 0 : _a.mouse.setCanvas(Universe.canvas);
    useEffect(() => {
        Universe.state.cursor.$parent.next(Universe.ctx3.camera);
        Universe.state.scrolling.$parent.next(Universe.ctx3.camera);
        Universe.state.scrolling.$position.next([0, 0, 0]);
    }, []);
    useFrame((state, delta, xrFrame) => {
        // bespoke entity behavior updates:
        if (Universe.sky) {
            const cameraPosition = Universe.ctx3.camera.matrix.elements.slice(12, 15);
            Universe.sky.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        }
        // update generic entities + systems:
        for (let i = 0; i < systems.updateSequence.length; i++) {
            systems.updateSequence[i].update(delta, systems);
        }
    });
    return null;
};
//# sourceMappingURL=three-ctx.js.map