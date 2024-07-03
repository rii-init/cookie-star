import { Vector3 } from "three";
import { systems } from ".";
import { Universe } from "../etc/0000_concept/universe";
import { named } from "../etc/0000_concept/named";
export const MagnetServer = named(function () { return null; }, "MagnetServer");
export const MagnetClient = named(function () { return null; }, "MagnetClient");
class MagnetServerState {
    constructor(state) {
        this.shape = state.geometry.type;
        this.position = state.position;
        this.vec3_position = null;
        this.radius = 0;
        this.localBoundingBox = state.geometry.localBoundingBox;
        this.globalBoundingBox = [0, 0, 0, 0, 0, 0];
    }
}
export class MagnetSystem {
    constructor() {
        this.name = "MagnetSystem";
        this.magnets = [];
        this.clients = []; // The user is implicitly a client. Other rigid bodies may be clients also
    }
    registerComponent(component, state) {
        var _a;
        const magnet = new MagnetServerState(state);
        // get global position of mesh
        const globalPosition = (((_a = state.mesh) === null || _a === void 0 ? void 0 : _a.getWorldPosition(new Vector3(0, 0, 0)).toArray()) ||
            [0, 0, 0]);
        // is your chumk a chonk?
        if (magnet.shape == "boxGeometry") { // hefty chonk 🐈
            magnet.globalBoundingBox = this.getGlobalBoundingBox(state, globalPosition);
        }
        else if (magnet.shape == "sphereGeometry") { // oh lawd he comin' 🐱
            magnet.vec3_position = new Vector3(...globalPosition);
            magnet.radius = state.geometry.args[0];
        }
        state.systemEntityState.MagnetServer = {
            remove: () => this.removeComponent(magnet)
        };
        this.magnets.push(magnet);
    }
    update(delta, context) {
        if (!this.dependencies)
            return;
        for (let idx = this.magnets.length; idx--; idx >= 0) {
            this.handleCollision(this.magnets[idx]);
        }
        // if (!this.magnets[0]) return;
        // this.handleCollision(this.magnets[0]);
    }
    removeComponent(magnet) {
        this.magnets = this.magnets.filter(m => m !== magnet);
    }
    clear() {
        this.magnets = [];
    }
    get dependencies() {
        var _a;
        if (this.camera && this.userControls) {
            return true;
        }
        this.camera = (_a = Universe === null || Universe === void 0 ? void 0 : Universe.ctx3) === null || _a === void 0 ? void 0 : _a.camera;
        this.userControls = systems.byComponent.UserControls;
        return !!this.camera && !!this.userControls;
    }
    getGlobalBoundingBox(state, globalPosition) {
        const globoBB = [];
        // 😳 oh my
        for (let i = 0; i < state.geometry.localBoundingBox.length; i++) {
            globoBB.push(state.geometry.localBoundingBox[i] + globalPosition[i % 3]);
        }
        return globoBB;
    }
    handleCollision(magnet) {
        if (magnet.shape == "boxGeometry") {
            if (magnet.rotation) {
                // take rotation into account
                // get local camera coordinates
            }
            else {
                if (this.XZBoundsCheck(this.camera.matrix.elements.slice(12, 15), magnet.globalBoundingBox)) {
                    this.handleBoxTopCollision(this.camera.matrix.elements.slice(12, 15), magnet.globalBoundingBox)
                        ||
                            this.handleBoxSideCollision(this.camera.matrix.elements.slice(12, 15), magnet.globalBoundingBox, magnet.localBoundingBox)
                        ||
                            this.handleBoxBottomCollision(this.camera.matrix.elements.slice(12, 15), magnet.globalBoundingBox);
                }
            }
        }
        else if (magnet.shape == "sphereGeometry") {
            this.handleSphereCollision(this.camera.position.distanceTo(magnet.vec3_position), magnet);
        }
    }
    //////////////////////////////
    //                          //
    //   Box collision model    //
    //                          //
    //////////////////////////////
    XZBoundsCheck(cameraCoords, globoBB, cornerWidth = 1.0) {
        return (cameraCoords[0] > globoBB[0] - cornerWidth && cameraCoords[0] < globoBB[3] + cornerWidth &&
            cameraCoords[2] > globoBB[2] - cornerWidth && cameraCoords[2] < globoBB[5] + cornerWidth);
    }
    //////////////////////////////
    //                          //
    // Box collision responses  //
    //                          //
    //////////////////////////////
    applyBoxTopCollisionResponse(camera, userControls, globoBB, cornerWidth) {
        // set camera matrix to top of box
        camera.matrix.elements[13] = globoBB[4] + cornerWidth / 2;
        // invert the y velocity of the user
        if (userControls.velocity.y < 0) {
            userControls.velocity.y *= -0.9;
        }
    }
    applyBoxFrontCollisionResponse(camera, userControls, globoBB, cornerWidth) {
        camera.matrix.elements[14] = globoBB[5] + 1;
        if (userControls.velocity.z > 0) {
            userControls.velocity.z *= -0.9;
        }
    }
    applyBoxBackCollisionResponse(camera, userControls, globoBB, cornerWidth) {
        camera.matrix.elements[14] = globoBB[2] - 1;
        if (userControls.velocity.z < 0) {
            userControls.velocity.z *= -0.9;
        }
    }
    applyBoxLeftCollisionResponse(camera, userControls, globoBB, cornerWidth) {
        camera.matrix.elements[12] = globoBB[0] - 1;
        if (userControls.velocity.x > 0) {
            userControls.velocity.x *= -0.9;
        }
    }
    applyBoxRightCollisionResponse(camera, userControls, globoBB, cornerWidth) {
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
    handleBoxTopCollision(cameraCoords, globoBB, cornerWidth = 1.0) {
        if (!this.camera || !this.userControls)
            return;
        if ( // above the (bottom of the top).... and below the top?
        cameraCoords[1] > (globoBB[4] - cornerWidth / 2) &&
            cameraCoords[1] < (globoBB[4] + cornerWidth / 2) // check y bounds
        ) {
            this.applyBoxTopCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            return true;
        }
    }
    handleBoxBottomCollision(cameraCoords, globoBB) {
        if (!this.camera)
            return;
        if ( // above the (bottom of the bottom).... and below the (top of the bottom)?
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
    handleBoxSideCollision(cameraCoords, globoBB, localBB) {
        if (!this.camera || !this.userControls)
            return;
        const cornerWidth = 1;
        const region = this.getBoxCollisionRegion(cameraCoords, globoBB, cornerWidth);
        // abort if not within vertical bounding box
        if (cameraCoords[1] < globoBB[1] - cornerWidth / 2 ||
            cameraCoords[1] > globoBB[4] + cornerWidth / 2)
            return;
        if (region[1] == 1) { // Z middle
            if (region[0] == 0) { // X left
                // simple axis aligned boundary
                this.applyBoxLeftCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
            else if (region[0] == 2) { // X right
                // simple axis aligned boundary
                this.applyBoxRightCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
            else { // X middle (just treat as top collision 🤷‍♀️)
                this.applyBoxTopCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
        }
        else if (region[1] == 0) { // Z back
            if (region[0] == 0) { // X left
                // corner boundary BTF
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);
            }
            else if (region[0] == 2) { // X right
                // corner boundary FTB
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);
            }
            else { // X middle 
                //                     (front)
                this.applyBoxBackCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
        }
        else { // Z front
            if (region[0] == 0) { // X left
                // corner boundary FTB 
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);
            }
            else if (region[0] == 2) { // X right
                // corner boundary BTF 
                this.handleDiagonalBoundary(cameraCoords, globoBB, localBB, cornerWidth, region);
            }
            else { // X middle
                // simple axis aligned boundary
                this.applyBoxFrontCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
            }
        }
        return true;
    }
    getBoxCollisionRegion(cameraCoords, globoBB, cornerWidth) {
        let x_region = 0;
        // check which X region (left, middle, or right)
        if (cameraCoords[0] > globoBB[0] - cornerWidth && cameraCoords[0] < globoBB[0] + cornerWidth) {
            // left
            x_region = 0;
        }
        else if (cameraCoords[0] > globoBB[3] - cornerWidth && cameraCoords[0] < globoBB[3] + cornerWidth) {
            // right
            x_region = 2;
        }
        else {
            // middle
            x_region = 1;
        }
        // check which Z region (front, middle, or back)
        if (cameraCoords[2] > globoBB[2] - cornerWidth && cameraCoords[2] < globoBB[2] + cornerWidth) {
            // front
            return [x_region, 0];
        }
        else if (cameraCoords[2] > globoBB[5] - cornerWidth && cameraCoords[2] < globoBB[5] + cornerWidth) {
            // back
            return [x_region, 2];
        }
        else {
            // middle
            return [x_region, 1];
        }
    }
    handleDiagonalBoundary(cameraCoords, globoBB, localBoundingBox, cornerWidth, region) {
        // take into account the X-Z region to determine the line equation of the boundary
        // get the local coordinates of the camera, relative to the collidable object
        const boundingBoxLocalCoordinates = [
            cameraCoords[0] - globoBB[0],
            cameraCoords[2] - globoBB[2]
        ];
        // get the width and depth from the object's bounding box (all its regions)
        const dimensions = [
            localBoundingBox[3] - localBoundingBox[0],
            localBoundingBox[5] - localBoundingBox[2]
        ];
        if (region[1] == 0) { // back
            if (region[0] == 0) {
                // back left corner 
                this.handleBTFDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0],
                    boundingBoxLocalCoordinates[1]
                ], () => {
                    this.applyBoxLeftCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                }, () => {
                    this.applyBoxBackCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                });
            }
            else if (region[0] == 2) {
                // back right corner (need to get the horizontal offset)
                const horizontalOffset = dimensions[0]; // subtract this from the x coordinate
                this.handleFTBDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0] - horizontalOffset,
                    boundingBoxLocalCoordinates[1]
                ], () => {
                    this.applyBoxRightCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                }, () => {
                    this.applyBoxBackCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                });
            }
        }
        else if (region[1] == 2) { // front
            if (region[0] == 0) {
                // front left corner (need to get depth offset)
                const depthOffset = dimensions[1]; // subtract this from the z coordinate
                this.handleFTBDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0],
                    boundingBoxLocalCoordinates[1] - depthOffset
                ], () => {
                    this.applyBoxFrontCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                }, () => {
                    this.applyBoxLeftCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                });
            }
            else if (region[0] == 2) {
                // front right corner (need to get horizontal and depth offset)
                const horizontalOffset = dimensions[0]; // subtract this from the x coordinate
                const depthOffset = dimensions[1]; // subtract this from the z coordinate
                this.handleBTFDiagonalBoundaryFromLocal([
                    boundingBoxLocalCoordinates[0] - horizontalOffset,
                    boundingBoxLocalCoordinates[1] - depthOffset
                ], () => {
                    this.applyBoxFrontCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                }, () => {
                    this.applyBoxRightCollisionResponse(this.camera, this.userControls, globoBB, cornerWidth);
                });
            }
        }
    }
    handleFTBDiagonalBoundaryFromLocal(localCameraCoords, aboveResponse, belowResponse) {
        if (!this.camera)
            return;
        // as x goes from -1 to +1, z goes from +1 to -1
        // z = -x
        if (localCameraCoords[1] > -localCameraCoords[0]) {
            aboveResponse();
        }
        else {
            belowResponse();
        }
    }
    handleBTFDiagonalBoundaryFromLocal(localCameraCoords, aboveResponse, belowResponse) {
        if (!this.camera)
            return;
        // as x goes from -1 to +1, z goes from -1 to +1
        // z = x
        if (localCameraCoords[1] > localCameraCoords[0]) {
            aboveResponse();
        }
        else {
            belowResponse();
        }
    }
    ////////////////////////////
    //                        //
    // Sphere collision model //
    //                        //
    ////////////////////////////
    handleSphereCollision(distance, magnet) {
        if (!this.camera)
            return;
        if (distance < magnet.radius) {
            // handle collision
            const bounceDirection = new Vector3(...this.camera.matrix.elements.slice(12, 15))
                .sub(magnet.vec3_position)
                .normalize();
            this.camera.matrix.makeTranslation(...bounceDirection.multiplyScalar(0.1).toArray());
        }
    }
}
//# sourceMappingURL=magnet.system.js.map