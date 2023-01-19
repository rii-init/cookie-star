import { Vector3 } from "three";
import { Magnet } from "./magnet";

export class MagnetismContext {

    private camera: THREE.Camera;
    private magnets: Magnet[] = [];

    constructor(camera: THREE.Camera) {
        this.camera = camera;
    }

    public registerMagnet(magnet: Magnet) {
        this.magnets.push(magnet);
    }

    public unregisterMagnet(magnet: Magnet) {
        this.magnets = this.magnets.filter(m => m !== magnet);
    }

    public update(delta: number) {
        for (let idx = this.magnets.length; idx--; idx >= 0) {
            this.handleCollision(this.magnets[idx]);
        }   

    } 

    private handleCollision(magnet: Magnet): void {
        if (magnet.shape == "box") {
            if (magnet.rotation) {
                // take rotation into account
                // get local camera coordinates
                

                
            } else {
                this.handleBoxTopCollision([
                    this.camera.position.x - magnet.position[0],
                    this.camera.position.y - magnet.position[1]
                ], magnet.dimensions);
                // this.handleBoxSideCollision();
            }
        } else if (magnet.shape == "sphere") {
            this.handleSphereCollision(this.camera.position.distanceTo(new Vector3(...magnet.position)), magnet);
        }
    }

    private handleSphereCollision(distance: number, magnet: Magnet) {
        if (distance < magnet.dimensions[0]) {
            // handle collision
            const bounceDirection = this.camera.position.clone().sub(new Vector3(...magnet.position)).normalize();
            this.camera.position.add(bounceDirection.multiplyScalar(0.1));
        }
    }

    private handleBoxTopCollision(localCameraCoordinates: [number, number], boxDimensions: number[]) {
        if (localCameraCoordinates[0] > 0 && localCameraCoordinates[0] < boxDimensions[0]
            && localCameraCoordinates[1] > 0 && localCameraCoordinates[1] < boxDimensions[1]) {
            // handle vertical collision
            this.camera.position.y = boxDimensions[1] + 0.5;
        }
    }

    private handleBoxSideCollision(localCameraCoordinates: Vector3, boxDimensions: number[]) {

    } 
}