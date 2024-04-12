import { Camera, Vector3 } from "three";
import { System, SystemComponentState, Systems } from ".";
import { ReactElement } from "react";
import { Universe } from "../../0000_concept/universe";
import { EntityState } from "../../0300_entity";
import { UserControls } from "../control/control";


export const MagnetServer = () => null;
export const MagnetClient = () => null;

export interface IMagnetServer {
    shape:             "boxGeometry" | "sphereGeometry";
    globalBoundingBox: [number, number, number,
                        number, number, number];
    
    radius:             number;
    
    position:      [number, number, number];
    vec3_position: Vector3 | null;

    rotation?:     [number, number, number];
}


class MagnetServerState implements IMagnetServer {
    shape:             "boxGeometry" | "sphereGeometry";
    globalBoundingBox: [number, number, number,
                        number, number, number];
    
    radius:             number;
    
    position:      [number, number, number];
    vec3_position: Vector3 | null;
    rotation?:     [number, number, number];

    constructor(state: EntityState) {
        this.shape = state.geometry.type;
        this.position = state.position;
        this.vec3_position = null;
        this.radius = 0;
        this.globalBoundingBox = [0,0,0,0,0,0];
    }
}

export class MagnetSystem implements System {

    private camera?:       THREE.Camera; // required; loaded async
    private userControls?: UserControls; 

    private magnets: IMagnetServer[] = []; 
    private clients: any[] = []; // The user is implicitly a client. Other rigid bodies may be clients also

    public registerComponent(component: ReactElement, state: EntityState): void {
        const magnet =  new MagnetServerState(state);

        // get global position of mesh
        const globalPosition = (
            state.mesh?.getWorldPosition(new Vector3(0,0,0)).toArray() as [number, number, number] ||
            [0,0,0]
        )
        
        // is your chumk a chonk?
        if (magnet.shape == "boxGeometry") {           // hefty chonk 🐈
            
            magnet.globalBoundingBox = this.getGlobalBoundingBox(
                state, 
                globalPosition
            ) as [number, number, number, number, number, number];
        
        } else if (magnet.shape == "sphereGeometry") { // oh lawd he comin' 🐱
            magnet.vec3_position = new Vector3(...globalPosition)
            magnet.radius = state.geometry.args[0];

        }

        state.systemEntityState["MagnetServer"] = {
            remove: () => this.removeComponent(magnet)
        };

        this.magnets.push(magnet);
    }


    public update(delta: number, context: Systems) {
        if (!this.dependencies) return;
        
        for (let idx = this.magnets.length; idx--; idx >= 0) {
            this.handleCollision(this.magnets[idx]);
        }   
    } 


    public removeComponent(magnet: IMagnetServer) {
        this.magnets = this.magnets.filter(m => m !== magnet);
    }

    public clear() {
        this.magnets = [];
    }



    get dependencies() {
        if (this.camera && this.userControls) {
            return true;
        } 
        
        this.camera = Universe?.ctx3?.camera;
        this.userControls = Universe?.user_controls; 
        
        return this.camera && this.userControls
    }

    private getGlobalBoundingBox(state: EntityState, globalPosition: [number, number, number]): number[] {
        const globoBB = [] as number[]; 
            
        // 😳 oh my
        for (let i = 0; i < state.geometry.localBoundingBox.length; i++) {
            globoBB.push(state.geometry.localBoundingBox[i] + globalPosition[i % 3]);
        }

        return globoBB;
    }

    private handleCollision(magnet: IMagnetServer): void {

	    if (magnet.shape == "boxGeometry") {
            if (magnet.rotation) {
                // take rotation into account
                // get local camera coordinates

            } else {
                this.handleBoxTopCollision(
                    (this.camera as Camera).matrix.elements.slice(12, 15),
                    magnet.globalBoundingBox
                );
                // we can do a cool optimisation here and only check for side collisions if the top collision is false, and so on, for the other types of collisions
                // || this.handleBoxSideCollision();
            }
        } else if (magnet.shape == "sphereGeometry") {
            this.handleSphereCollision((this.camera as Camera).position.distanceTo(magnet.vec3_position as Vector3), magnet);
        }
    }

    

    private handleBoxTopCollision(cameraCoords: number[], globoBB: number[]) {
        if (!this.camera) return;
        if (cameraCoords[0] > globoBB[0] && cameraCoords[0] < globoBB[3] // check x bounds
            && 
            // above the bottom.... and below the top?
            cameraCoords[1] > globoBB[1] && cameraCoords[1] < globoBB[4] + 1 // check y bounds
            &&
            cameraCoords[2] > globoBB[2] && cameraCoords[2] < globoBB[5]     // check z bounds
        ) {
            // handle vertical collision
            
            // set camera matrix to top of box
            this.camera.matrix.elements[13] = globoBB[4] + 1;

            // invert the y velocity of the user
            if (this.userControls) {
                this.userControls.velocity.y *= -0.9; // check how bouncy the object is.. and the user too :3
            }
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
    
    private handleSphereCollision(distance: number, magnet: IMagnetServer) {
        if (!this.camera) return;

        if (distance < magnet.radius) {
                // handle collision
                const bounceDirection = this.camera.position.clone()
                                                            .sub(magnet.vec3_position as Vector3)
                                                            .normalize();
                this.camera.position.add(bounceDirection.multiplyScalar(0.1));
        }
    }
}
