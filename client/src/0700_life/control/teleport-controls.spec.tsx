import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Raycaster, Scene } from "three";
import { TeleportControls } from "./teleport-controls";

describe("TeleportControls", () => {


    it("should move the cursor to the intersection point", () => {
        
        // mock three.js scene
        const scene = new Scene();

        // mock XRController
        const controller = new Object3D();
        const grip       = new Object3D();
        const raycaster  = new Raycaster();
        
        // mock surface to teleport to
        const surface = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial({ color: 0x00ff00 })
        );

        // add surface to scene
        scene.add(surface);


        // create the cursor:
        const cursor = new Mesh(
            new BoxGeometry(0.1, 0.1, 0.1),
            new MeshBasicMaterial({ color: 0xff00ff })
        );

        // add cursor to scene
        scene.add(cursor);


        // keep track of the intersections
        let intersections: any[] = [];

        // Test the teleport controls
        const teleportControls = TeleportControls({ gl, scene, controller, grip, raycaster, cursor, intersections });


        // verify the ray cast hit the surface
        expect(intersections.length).toBe(1);

        // verify the cursor is at the intersection point
        expect(intersections[0].point).toEqual(new THREE.Vector3(0, 0, -1));


    })

});