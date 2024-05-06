import { Camera, Vector3 } from "three";
import { System, SystemComponentState, Systems, systems } from ".";
import { ReactElement } from "react";
import { Universe } from "../../0000_concept/universe";
import { EntityState } from "../../0300_entity";
import { UserControlsSystem } from "./control/control";
import { named } from "../../0000_concept/named";
import { spatialVisualInstrumentState } from "../../0300_entity/instrument/spatial.visual.instrument";



export const MagnetServer = named(function(){ return null}, "MagnetServer");
export const MagnetClient = named(function(){ return null}, "MagnetClient");



class MagnetServerState {
    shape:             "boxGeometry" | "sphereGeometry";
    localBoundingBox:  [number, number, number, 
                        number, number, number];
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
        this.localBoundingBox = state.geometry.localBoundingBox;
        this.globalBoundingBox = [0,0,0,0,0,0];
    }
}

export class MagnetSystem implements System {

    name = "MagnetSystem";

    private camera?:       THREE.Camera; // required; loaded async
    private userControls?: UserControlsSystem; 

    private magnets: MagnetServerState[] = []; 
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

        state.systemEntityState.MagnetServer = {
            remove: () => this.removeComponent(magnet)
        };

        this.magnets.push(magnet);
    }


    public update(delta: number, context: Systems) {
        if (!this.dependencies) return;
        
        for (let idx = this.magnets.length; idx--; idx >= 0) {
            this.handleCollision(this.magnets[idx]);
        } 
        
        // if (!this.magnets[0]) return;
        // this.handleCollision(this.magnets[0]);
    } 


    public removeComponent(magnet: MagnetServerState) {
        this.magnets = this.magnets.filter(m => m !== magnet);
    }

    public clear() {
        this.magnets = [];
    }



    get dependencies(): boolean {
        if (this.camera && this.userControls) {
            return true;
        } 
        
        this.camera = Universe?.ctx3?.camera;
        this.userControls = systems.byComponent.UserControls as UserControlsSystem; 
        
        return !!this.camera && !!this.userControls
    }

    private getGlobalBoundingBox(state: EntityState, globalPosition: [number, number, number]): number[] {
        const globoBB = [] as number[]; 
            
        // 😳 oh my
        for (let i = 0; i < state.geometry.localBoundingBox.length; i++) {
            globoBB.push(state.geometry.localBoundingBox[i] + globalPosition[i % 3]);
        }

        return globoBB;
    }


    private handleCollision(magnet: MagnetServerState): void {

        if (magnet.shape == "boxGeometry") {
            if (magnet.rotation) {
                // take rotation into account
                // get local camera coordinates

            } else {
                if (this.XZBoundsCheck((this.camera as Camera).matrix.elements.slice(12, 15), 
                                        magnet.globalBoundingBox
                )) {

                    this.handleBoxTopCollision(
                        (this.camera as Camera).matrix.elements.slice(12, 15),
                        magnet.globalBoundingBox
                    )
                    || 
                    this.handleBoxSideCollision(
                        (this.camera as Camera).matrix.elements.slice(12, 15),
                        magnet.globalBoundingBox,
                        magnet.localBoundingBox
                    )
                    || 
                    this.handleBoxBottomCollision(
                        (this.camera as Camera).matrix.elements.slice(12, 15),
                        magnet.globalBoundingBox
                    );
                }
            }
        } else if (magnet.shape == "sphereGeometry") {
            this.handleSphereCollision((this.camera as Camera).position.distanceTo(magnet.vec3_position as Vector3), magnet);
        }
    }


    //////////////////////////////
    //                          //
    //   Box collision model    //
    //                          //
    //////////////////////////////
    private XZBoundsCheck(cameraCoords: number[], globoBB: number[], cornerWidth = 1.0) {
        return (
            cameraCoords[0] > globoBB[0] - cornerWidth && cameraCoords[0] < globoBB[3] + cornerWidth &&
            cameraCoords[2] > globoBB[2] - cornerWidth && cameraCoords[2] < globoBB[5] + cornerWidth
        );
    }

    //////////////////////////////
    //                          //
    // Box collision responses  //
    //                          //
    //////////////////////////////
    private applyBoxTopCollisionResponse(   camera: Camera,  userControls: UserControlsSystem, 
                                            globoBB: number[], cornerWidth: number ) {
        
        // set camera matrix to top of box
        camera.matrix.elements[13] = globoBB[4] + cornerWidth / 2;

        // invert the y velocity of the user
        if (userControls.velocity.y < 0) {
            userControls.velocity.y *= -0.9; 
        }
    }

    private applyBoxFrontCollisionResponse( camera: Camera,  userControls: UserControlsSystem, 
                                            globoBB: number[], cornerWidth: number ) {
        
        camera.matrix.elements[14] = globoBB[5] + 1;
        
        if (userControls.velocity.z > 0) {
            userControls.velocity.z *= -0.9; 
        }
    }

    private applyBoxBackCollisionResponse(   camera:  Camera,  userControls: UserControlsSystem, 
                                        globoBB: number[], cornerWidth: number) {

        camera.matrix.elements[14] = globoBB[2] - 1;

        if (userControls.velocity.z < 0) {
            userControls.velocity.z *= -0.9; 
        }
    }

    private applyBoxLeftCollisionResponse(  camera:  Camera,  userControls: UserControlsSystem, 
                                            globoBB: number[], cornerWidth: number) {
        
        camera.matrix.elements[12] = globoBB[0] - 1;
        
        if (userControls.velocity.x > 0) {
            userControls.velocity.x *= -0.9; 
        }
    }

    private applyBoxRightCollisionResponse( camera:  Camera,  userControls: UserControlsSystem, 
                                            globoBB: number[], cornerWidth: number) {

        camera.matrix.elements[12] = globoBB[3] + 1;

        if (userControls.velocity.x > 0) {
            userControls.velocity.x *= -0.9; 
        }
    }

    /////////////////////////////////
    //                             //
    // Box sides collision helpers //
    //                             //
    /////////////////////////////////
    private handleBoxTopCollision(cameraCoords: number[], globoBB: number[], cornerWidth = 1.0) {
        if (!this.camera || !this.userControls) return;
        
        if (// above the (bottom of the top).... and below the top?
            cameraCoords[1] > (globoBB[4] - cornerWidth / 2) && 
            cameraCoords[1] < (globoBB[4] + cornerWidth / 2) // check y bounds
        ) {
            this.applyBoxTopCollisionResponse(this.camera,  this.userControls, globoBB, cornerWidth);

            return true;
        }
    }

    private handleBoxBottomCollision(cameraCoords: number[], globoBB: number[]) {
        if (!this.camera) return;
        
        if (// above the (bottom of the bottom).... and below the (top of the bottom)?
            cameraCoords[1] > (globoBB[1] - 1) && cameraCoords[1] < globoBB[1] + 1 // check y bounds
        ) {
            // set camera matrix to top of box
            this.camera.matrix.elements[13] = globoBB[1] - 1;

            // invert the y velocity of the user
            if (this.userControls) {
                
                if (this.userControls.velocity.y > 0) {
                    this.userControls.velocity.y *= -0.9;
                }
            }

            return true;
        }
    }


    private handleBoxSideCollision(cameraCoords: number[], globoBB: number[], localBB: number[]) {
        if (!this.camera || ! this.userControls) return;
        
        const cornerWidth = 1;
        const region = this.getBoxCollisionRegion(cameraCoords, globoBB, cornerWidth);

        // abort if not within vertical bounding box
        if (cameraCoords[1] < globoBB[1] - cornerWidth / 2 || 
            cameraCoords[1] > globoBB[4] + cornerWidth / 2) return;

        if (region[1] == 1) {        // Z middle
            if (region[0] == 0) {           // X left
                // simple axis aligned boundary
                this.applyBoxLeftCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);

            } else if (region[0] == 2) {    // X right
                // simple axis aligned boundary
                this.applyBoxRightCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);

            } else {                        // X middle (just treat as top collision 🤷‍♀️)
                this.applyBoxTopCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                
            }

        } else if (region[1] == 0) { // Z back
            if (region[0] == 0) {           // X left
                // corner boundary BTF
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);

            } else if (region[0] == 2) {    // X right
                // corner boundary FTB
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);

            } else {                        // X middle 
                //                     (front)
                this.applyBoxBackCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
        } else {                     // Z front
            if (region[0] == 0) {           // X left
                // corner boundary FTB 
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);

            } else if (region[0] == 2) {    // X right
                // corner boundary BTF 
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);

            } else {                        // X middle
                // simple axis aligned boundary
                this.applyBoxFrontCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
        }

        return true;
    }

    private getBoxCollisionRegion(cameraCoords: number[], globoBB: number[], cornerWidth: number) {
        
        let x_region = 0;

        // check which X region (left, middle, or right)
        if (       cameraCoords[0] > globoBB[0] - cornerWidth && cameraCoords[0] < globoBB[0] + cornerWidth) {
            // left
            x_region = 0;
        } else if (cameraCoords[0] > globoBB[3] - cornerWidth && cameraCoords[0] < globoBB[3] + cornerWidth) {
            // right
            x_region = 2;
        } else {
            // middle
            x_region = 1;
        }
        
        // check which Z region (front, middle, or back)
        if (       cameraCoords[2] > globoBB[2] - cornerWidth && cameraCoords[2] < globoBB[2] + cornerWidth) {
            // front
            return [x_region, 0];
        } else if (cameraCoords[2] > globoBB[5] - cornerWidth && cameraCoords[2] < globoBB[5] + cornerWidth) {
            // back
            return [x_region, 2];
        } else {
            // middle
            return [x_region, 1];
        }
    }


    private handleDiagonalBoundary(  cameraCoords:     number[], globoBB:     number[], 
                                        localBoundingBox: number[], cornerWidth: number, region: number[]) {
        // take into account the X-Z region to determine the line equation of the boundary
        
        // get the local coordinates of the camera, relative to the collidable object
        const boundingBoxLocalCoordinates = [
            cameraCoords[0] - globoBB[0],
            cameraCoords[2] - globoBB[2]
        ]

        // get the width and depth from the object's bounding box (all its regions)
        const dimensions = [
            localBoundingBox[3] - localBoundingBox[0],
            localBoundingBox[5] - localBoundingBox[2]
        ]

        
        if (region[1] == 0) { // back
            if (       region[0] == 0) {
                // back left corner 
                
                this.handleBTFDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0], 
                    boundingBoxLocalCoordinates[1]
                ],
                    () => { // "above" (in front) of diagonal boundary
                        
                        this.applyBoxLeftCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    },
                    () => { // "below" (behind) (/ more negative of) diagonal boundary
                        
                        this.applyBoxBackCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    }
                );

            } else if (region[0] == 2) {
                // back right corner (need to get the horizontal offset)
                const horizontalOffset = dimensions[0] // subtract this from the x coordinate
                
                this.handleFTBDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0] - horizontalOffset, 
                    boundingBoxLocalCoordinates[1]
                ],
                    () => { // "above" (in front) of diagonal boundary
                        
                        this.applyBoxRightCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    },
                    () => { // "below" (behind) (/ more negative of) diagonal boundary
                        
                        this.applyBoxBackCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    }
                );
            }   

        } else if (region[1] == 2) { // front
            if (       region[0] == 0) {
                // front left corner (need to get depth offset)
                const depthOffset = dimensions[1];  // subtract this from the z coordinate

                this.handleFTBDiagonalBoundaryFromLocal([
                        boundingBoxLocalCoordinates[0], 
                        boundingBoxLocalCoordinates[1] - depthOffset
                    ],
                    () => { // "above" (in front) of diagonal boundary
                        
                        this.applyBoxFrontCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    },
                    () => { // "below" (behind) (/ more negative of) diagonal boundary
                        
                        this.applyBoxLeftCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    }
                );
            } else if (region[0] == 2) {
                // front right corner (need to get horizontal and depth offset)
                const horizontalOffset = dimensions[0] // subtract this from the x coordinate
                const depthOffset      = dimensions[1] // subtract this from the z coordinate
            
                
                this.handleBTFDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0] - horizontalOffset, 
                    boundingBoxLocalCoordinates[1] - depthOffset
                    ],
                    () => { // "above" (in front) of diagonal boundary
                        
                        this.applyBoxFrontCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    },
                    () => { // "below" (behind) (/ more negative of) diagonal boundary
                        
                        this.applyBoxRightCollisionResponse(this.camera as Camera, this.userControls as UserControlsSystem, globoBB, cornerWidth);
                    }    
                );
            }

        }
    }

    private handleFTBDiagonalBoundaryFromLocal(localCameraCoords: number[], aboveResponse: Function, belowResponse: Function) {
        if (!this.camera) return;
        // as x goes from -1 to +1, z goes from +1 to -1
        // z = -x

        if (localCameraCoords[1] > -localCameraCoords[0]) {
            
            aboveResponse();
        } else {
            
            belowResponse();
        }
    }

    private handleBTFDiagonalBoundaryFromLocal(localCameraCoords: number[], aboveResponse: Function, belowResponse: Function) {
        if (!this.camera) return;
        // as x goes from -1 to +1, z goes from -1 to +1
        // z = x

        if (localCameraCoords[1] > localCameraCoords[0]) {
            
            aboveResponse();
        } else {
            
            belowResponse();
        }
    }

    

    ////////////////////////////
    //                        //
    // Sphere collision model //
    //                        //
    ////////////////////////////
    private handleSphereCollision(distance: number, magnet: MagnetServerState) {
        if (!this.camera) return;

        if (distance < magnet.radius) {
                // handle collision
                const bounceDirection = new Vector3(...this.camera.matrix.elements.slice(12, 15) as [number, number, number])
                                                            .sub(magnet.vec3_position as Vector3)
                                                            .normalize();

                this.camera.matrix.makeTranslation(...bounceDirection.multiplyScalar(0.1).toArray());
        }
    }
}
