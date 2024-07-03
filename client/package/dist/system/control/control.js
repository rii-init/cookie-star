import { Euler, Matrix4, Vector2, Vector3 } from "three";
import { Universe } from "../../etc/0000_concept/universe";
import { ControlType } from "./control.type";
import { GamepadControl } from "./gamepad.control";
import { KeyboardState } from "./keyboard.control";
import { MouseState } from "./mouse.control";
import { MouseScrollControl } from "./scroll/mouse.scroll.control";
import { ScrollControl } from "./scroll/scroll.control";
import { TouchControl } from "./touch.control";
import { TouchScrollControl } from "./scroll/touch.scroll.control";
import { CameraTrack } from "./track/camera-track";
import { XRControllerState } from "./xr-controlls";
export class UserControlsSystem {
    constructor() {
        this.ctx3 = null;
        this.movement = new Matrix4();
        this.rotation = new Matrix4();
        this.rollVelocity = 0;
        this.keyRotationVelocity = new Vector2(0, 0);
        this.roll = new Vector3(0, 0, 0);
        this.moveVector = new Vector3(0, 0, 0);
        this.velocity = new Vector3(0, 0, 0);
        this.enableFlying = false;
        this.controllersAttached = false;
        this.xrControllers = [];
        this.xr_player = null;
        this.mode = ControlType.Scrolling;
        this.track = new CameraTrack();
        this.gamepad = new GamepadControl(this);
        this.touch = new TouchControl();
        this.mouse = new MouseState(this);
        this.keys = new KeyboardState(this);
        this.xrControls = new XRControllerState();
        this.cursorHidden = false;
        this.cursorActivated = 0;
        this.cursorPosition = null;
        this.scrollDistance = 0;
        this.scrollDomain = 1;
        this.scrollControl = new ScrollControl(this.touch, new MouseScrollControl(), new TouchScrollControl(this.touch));
        this.handlePointerOver = (mesh) => {
            Universe.state.cursor.$activation.next(0.15);
        };
        this.handlePointerOut = (mesh) => {
            Universe.state.cursor.$activation.next(0.25);
        };
        this.track.init();
        this.keys.init();
        this.mouse.init();
        this.keys.addKeyUpHandler((key) => {
            if (key.key === "Escape") {
                this.mouse.isLocked = false;
                //document.querySelector(".App")?.setAttribute("class", "App");
            }
        });
        this.mouse.setCanvas(Universe.canvas);
        this.scrollControl.addOnScrollHandler((y) => {
            this.scroll(this.scrollDistance + y / 2000);
        });
        Universe.state.scrolling.$scrollDomain.subscribe((domain) => {
            this.scrollDomain = domain;
        });
    }
    // ecs system component API
    registerComponent(component, state) {
        // requries some working with control subjects in a collection instead of just one camera / subject
        // not top priority
    }
    update(delta, context) {
        if (!this.dependencies)
            return;
        this.mouse.dx /= 1.15;
        this.mouse.dy /= 1.15;
        if (!Universe.xrMode) {
            this.calculateMoveVector();
            this.calculateRotationVector();
            // this.gyro?.update();
            this.calculatePosition(delta, this.dependencies.camera);
        }
        else {
            this.xrControls.update(delta);
        }
    }
    removeComponent(component) {
    }
    get dependencies() {
        return this.ctx3 || ((this.ctx3 = Universe.ctx3), this.ctx3);
    }
    // bespoke API
    toggleManualCameraControl(mode) {
        if (!this.dependencies)
            return;
        if (mode === ControlType.Touch__And__Keyboard__And__Mouse ||
            this.mode === ControlType.Scrolling) {
            this.mode = ControlType.Touch__And__Keyboard__And__Mouse;
            this.dependencies.camera.matrixAutoUpdate = false;
            Universe.state.scrolling.$parent.next(this.dependencies.scene);
            Universe.state.scrolling.$position.next(this.dependencies.camera.position.toArray());
            this.velocity.y = 0;
        }
        else {
            this.mode = ControlType.Scrolling;
            this.dependencies.camera.matrixAutoUpdate = true;
            Universe.state.scrolling.$parent.next(this.dependencies.camera);
            Universe.state.scrolling.$position.next([0, 0, 0]);
        }
    }
    scroll(to) {
        this.scrollDistance = to;
        if (this.scrollDistance < 0)
            this.scrollDistance = 0;
        if (this.scrollDistance > this.scrollDomain)
            this.scrollDistance = this.scrollDomain;
        Universe.state.scrolling.$distance.next(this.scrollDistance);
    }
    getPositionFromMatrix(baseMatrix) {
        return baseMatrix.slice(12, 15);
    }
    calculatePosition(delta, camera) {
        // Scrolling Mode
        if (this.mode === ControlType.Scrolling) {
            this.track.interpolate(camera, this.scrollDistance);
            // Manual camera control Mode:
        }
        else {
            this.calculateManualNonVRCameraMovement(camera, delta);
        }
        // air friction:
        this.velocity.multiplyScalar(0.97);
        camera.updateMatrixWorld();
    }
    calculateManualNonVRCameraMovement(camera, delta) {
        const m1T = this.calculateNonVRCameraMovementStep1(camera, delta);
        this.rotation.identity();
        this.rotation.makeRotationFromEuler(new Euler(this.mouse.dy / -620, this.mouse.dx / -620, this.roll.z / 35));
        camera.matrix.multiply(this.rotation);
        this.handleKeyboardCameraRotation(camera);
        camera.matrix.multiply(this.rotation);
        this.calculateNonVRCameraMovementStep3(camera, delta, m1T);
    }
    calculateNonVRCameraMovementStep1(camera, delta) {
        const move = this.moveVector.multiplyScalar(delta);
        const m1T = camera.matrix.elements.slice(12, 15);
        this.movement.identity();
        this.movement.makeTranslation(move.x, move.y, move.z);
        return m1T;
    }
    calculateNonVRCameraMovementStep3(camera, delta, m1T) {
        camera.matrix.multiply(this.movement);
        const m2T = camera.matrix.elements.slice(12, 15);
        const deltaMT = new Vector3(m2T[0] - m1T[0], m2T[1] - m1T[1], m2T[2] - m1T[2]);
        this.velocity.add(deltaMT.multiplyScalar(0.1));
        const elements = camera.matrix.elements;
        elements[12] -= deltaMT.x;
        elements[13] -= deltaMT.y;
        elements[14] -= deltaMT.z;
        elements[12] += this.velocity.x;
        elements[13] += this.velocity.y;
        elements[14] += this.velocity.z;
        camera.updateMatrixWorld(true);
    }
    handleKeyboardCameraRotation(camera) {
        this.rotation.identity();
        this.keyRotationVelocity.x -= this.keys.ArrowDown ? 0.0025 : 0 - (this.keys.ArrowUp ? 0.0025 : 0);
        this.keyRotationVelocity.y -= this.keys.ArrowRight ? 0.0025 : 0 - (this.keys.ArrowLeft ? 0.0025 : 0);
        this.keyRotationVelocity.x = Math.max(-0.025, Math.min(0.025, this.keyRotationVelocity.x * 0.92));
        this.keyRotationVelocity.y = Math.max(-0.025, Math.min(0.025, this.keyRotationVelocity.y * 0.92));
        this.rotation.makeRotationFromEuler(new Euler(this.keyRotationVelocity.x, this.keyRotationVelocity.y, this.roll.z / 35));
        camera.matrix.multiply(this.rotation);
    }
    calculateMoveVector() {
        if (!this.dependencies)
            return;
        this.moveVector.set(0, 0, 0);
        if (this.keys.w) {
            this.moveVector.z = -1;
        }
        if (this.keys.s) {
            this.moveVector.z = 1;
        }
        if (this.keys.a) {
            this.moveVector.x = -1;
        }
        if (this.keys.d) {
            this.moveVector.x = 1;
        }
        if (this.keys.r) {
            this.moveVector.y = 1;
        }
        if (this.keys.f) {
            this.moveVector.y = -1;
        }
        if (this.keys.shift) {
            this.moveVector.multiplyScalar(3);
        }
        if (this.keys.space) {
            this.moveVector.y = 3;
            if (this.dependencies.camera.matrix.elements[13] > 2) {
                this.enableFlying = true;
            }
        }
        this.moveVector.x -= this.touch.dx / 2.0;
        this.moveVector.z -= this.touch.dy / 2.0;
    }
    calculateRotationVector() {
        this.roll.z = 0;
        if (this.keys.q) {
            this.rollVelocity += 0.05;
        }
        if (this.keys.e) {
            this.rollVelocity -= 0.05;
        }
        // this.rollVelocity -= this.mouse.dx / 1000;
        this.rollVelocity *= 0.95;
        this.roll.z += this.rollVelocity;
    }
}
//# sourceMappingURL=control.js.map