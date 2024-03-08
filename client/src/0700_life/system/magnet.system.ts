import { Vector3 } from "three";


export interface MagnetServer {
    mesh: THREE.Mesh;
    dimensions: [number, number, number];
    shape:      "box" | "sphere";
    
    rotation?: [number, number, number];
}



export class MagnetSystem {

    private camera?: THREE.Camera;
    private magnets: MagnetServer[] = [];
    private clients: any[] = [];

    public setCamera(camera: THREE.Camera) {
        this.camera = camera;
    }

    public registerMagnet(magnet: MagnetServer) {
        this.magnets.push(magnet);
    }

    public unregisterMagnet(magnet: MagnetServer) {
        this.magnets = this.magnets.filter(m => m !== magnet);
    }

    public update(delta: number) {
        for (let idx = this.magnets.length; idx--; idx >= 0) {
            this.handleCollision(this.magnets[idx]);
        }   

    } 

    private handleCollision(magnet: MagnetServer): void {
        if (!this.camera) return;

	    if (magnet.shape == "box") {
            if (magnet.rotation) {
                // take rotation into account
                // get local camera coordinates

            } else {
                this.handleBoxTopCollision(
                    this.camera.matrix.elements.slice(12, 15),
                    magnet.mesh.position.toArray(),
                    magnet.dimensions
                );
                // this.handleBoxSideCollision();
            }
        } else if (magnet.shape == "sphere") {
            this.handleSphereCollision(this.camera.position.distanceTo(magnet.mesh.position), magnet);
        }
    }

    

    private handleBoxTopCollision(cameraCoords: number[], magnetCoords: number[], boxDimensions: number[]) {
        if (!this.camera) return;
        if (cameraCoords[0] > magnetCoords[0] - boxDimensions[0] / 2 && 
            cameraCoords[0] < magnetCoords[0] + boxDimensions[0]
            && 
            cameraCoords[2] > magnetCoords[2] - boxDimensions[2] / 2 && 
            cameraCoords[2] < magnetCoords[2] + boxDimensions[2] / 2 
            &&
            cameraCoords[1] < magnetCoords[1] + boxDimensions[1] / 2 &&
            cameraCoords[1] > magnetCoords[1] - boxDimensions[1] / 2
        ) {
            // handle vertical collision
            console.log("box top?", cameraCoords, boxDimensions);
            
            // set camera matrix to top of box
            this.camera.matrix.elements[13] = magnetCoords[1] + (boxDimensions[1] / 2);
        }
    }

    private handleBoxSideCollision(localCameraCoordinates: Vector3, boxDimensions: number[]) {
        if (!this.camera) return;

        if (localCameraCoordinates.x > 0 && localCameraCoordinates.x < boxDimensions[0]
            && localCameraCoordinates.y > 0 && localCameraCoordinates.y < boxDimensions[1]) {
            // handle horizontal collision
            // this.camera.matrix.elements[13] = boxDimensions[1] - 3.5;
        }
    }
    
    

    private handleSphereCollision(distance: number, magnet: MagnetServer) {
        if (!this.camera) return;

        if (distance < magnet.dimensions[0]) {
                // handle collision
                const bounceDirection = this.camera.position.clone().sub(magnet.mesh.position).normalize();
                this.camera.position.add(bounceDirection.multiplyScalar(0.1));
        }
    }
}
