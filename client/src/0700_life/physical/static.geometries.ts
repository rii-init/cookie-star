import THREE from "three";
import { UserControls } from "../control/control";

export class StaticGeometries {
    
    public collision(controls: UserControls, camera: THREE.Camera, velocity: THREE.Vector3, delta: number) {
        this.collisionWithGround(controls, camera, velocity, delta);
    }

    private collisionWithGround(controls: UserControls, camera: THREE.Camera, velocity: THREE.Vector3, delta: number){
        // Handle basic collision with the ground
        if (camera.matrix.elements[13] < 0.75) {
            camera.matrix.elements[13] = 0.75;
            velocity.y *= -0.75;
            velocity.z *= 0.97;
            velocity.x *= 0.97;

            controls.enableFlying = false;
        }  
    }
     
}