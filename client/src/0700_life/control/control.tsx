import { Camera, Euler, Group, Matrix4, Mesh, Raycaster, Vector2, Vector3 } from "three";
import { CTX3 } from "../../0000_api/three-ctx";
import { Universe } from "../../0000_concept/universe";
import { StaticGeometries } from "../physical/static.geometries";
import { GamepadControl } from "./gamepad.control";
import { KeyboardState } from "./keyboard.control";
import { MouseState } from "./mouse.control";
import { MouseScrollControl } from "./scroll/mouse.scroll.control";
import { ScrollControl } from "./scroll/scroll.control";
import { TouchControl } from "./touch.control";
import { TouchScrollControl } from "./scroll/touch.scroll.control";
import { DeviceOrientationControls } from './device-orientation.control'
import { ControlType } from "./control.type";
import { CameraTrack } from "./track/camera-track";
import { xRControllerState } from "./climbing-controls";
import { XRController } from "@react-three/xr";


export class UserControls {
    
    private ctx3: CTX3;
    
    private movement     = new Matrix4();
    private rotation     = new Matrix4();
    private rollVelocity = 0;
    private keyRotationVelocity = new Vector2(0,0);
    public  roll         = new Vector3(0, 0, 0);
    
    public  moveVector   = new Vector3(0, 0, 0);
    public  velocity     = new Vector3(0, 0, 0);
  
    public enableFlying        = false;
    public controllersAttached = false;
    public xrControllers       = [] as XRController[];
    public xr_player           = null as null | Group;
    public mode                = ControlType.Scrolling;

    public track    = new CameraTrack();
    public gamepad  = new GamepadControl(this);
    public touch    = new TouchControl();
    public mouse    = new MouseState(this);
    public keys     = new KeyboardState(this);
    public gyro?:  DeviceOrientationControls;

    public staticGeom = new StaticGeometries();

    public cursorHidden = false;
    public cursorActivated = 0;
    public cursorPosition: [number, number, number] | null = null;

    private scrollDistance = 0;

    public scrollControl = new ScrollControl(
        this.touch,
        new MouseScrollControl(),
        new TouchScrollControl(this.touch)
    )


    constructor(ctx3: CTX3) {
        this.ctx3 = ctx3;

        this.track.init();
        this.keys.init();
        this.mouse.init();
        this.gyro = new DeviceOrientationControls( ctx3.camera );
        //this.gyro.connect();

        // ctx3.camera.matrix.elements[13]  = 1.6;
        // ctx3.camera.matrix.elements[14]  = 1.5;
        

        this.keys.addKeyUpHandler((key) => {
            if (key.key === "Escape") {
                this.mouse.isLocked = false;
                //document.querySelector(".App")?.setAttribute("class", "App");
            }
        })

        this.mouse.setCanvas(Universe.canvas);

        this.scrollControl.addOnScrollHandler((y: number) => {
            this.scrollDistance += y / 2000;
        });

    }

    public handlePointerOver = (mesh?: Mesh) => {
        Universe.state.cursor.$activation.next(0.0);
    }

    public handlePointerOut = (mesh?: Mesh) => {
        Universe.state.cursor.$activation.next(0.025);
    }

    

    private getPositionFromMatrix(baseMatrix: number[]) {
        return baseMatrix.slice(12, 15);
    }

    public update(delta: number, xrFrame?: XRFrame) {
        this.mouse.dx /= 1.15;
        this.mouse.dy /= 1.15;

        if (!Universe.xrMode) {
            this.calculateMoveVector();
            this.calculateRotationVector();
            // this.gyro?.update();
            this.calculatePosition(delta);
        } else {

            for (const hand in xRControllerState.handedness) {
                const controller = xRControllerState.handedness[hand as "left" | "right" | "none"];

                if (controller.selecting && controller.baseMatrix) {
                    
                    const delta = this.getPositionFromMatrix(controller.baseMatrix)
                                      .map((v, i) => v - controller.previousPosition[i]);
                    
                    controller.previousPosition = this.getPositionFromMatrix(controller.baseMatrix);

                    // move xr camera by delta
                    
                    // this.xr_player?.position.sub(new Vector3(delta[0], delta[1], delta[2]));

                }
                    
            }

        }
    }


    public toggleManualCameraControl(mode?: ControlType) { 
        if (     mode === ControlType.Touch__And__Keyboard__And__Mouse || 
            this.mode === ControlType.Scrolling) {

            this.mode = ControlType.Touch__And__Keyboard__And__Mouse;
            this.ctx3.camera.matrixAutoUpdate = false;
            this.velocity.y = 0;
        } else {
            this.mode = ControlType.Scrolling;
            this.ctx3.camera.matrixAutoUpdate = true;
        }
    }


    private calculatePosition(delta: number) {
        const camera = this.ctx3.camera;

	    
            
        // Scrolling Mode
        if (this.mode === ControlType.Scrolling) {           
            const m1T = this.calculateNonVRCameraMovementStep1(camera, delta); 
            
            this.track.interpolate(camera, this.scrollDistance);

        // Manual camera control Mode:
        } else {

            this.calculateManualNonVRCameraMovement(camera, delta);          

        }

        // Collision Detection
        this.staticGeom.collision(this, camera, this.velocity, delta)

        // Terrestrial Movement:
        if (!this.enableFlying) {
            this.velocity.y -= 0.0025;
        }
    
        camera.updateMatrixWorld();
    }


    private calculateManualNonVRCameraMovement(camera: Camera, delta: number) {

        const  m1T = this.calculateNonVRCameraMovementStep1(camera, delta);

        this.rotation.identity(); 
        this.rotation.makeRotationFromEuler(new Euler(this.mouse.dy/-310, this.mouse.dx/-310, this.roll.z/35))
        camera.matrix.multiply(this.rotation);

        this.handleKeyboardCameraRotation(camera);
        
        camera.matrix.multiply(this.rotation);

        this.calculateNonVRCameraMovementStep3(camera, delta, m1T as [number, number, number]);
    }

    private calculateNonVRCameraMovementStep1(camera: Camera, delta: number) {

        const move = this.moveVector.multiplyScalar(delta);
        const  m1T = camera.matrix.elements.slice(12,15) as [number, number, number];

        this.movement.identity();        
        this.movement.makeTranslation(move.x, move.y, move.z);

        return m1T;
    }

    private calculateNonVRCameraMovementStep3(camera: Camera, delta: number, m1T: [number, number, number]) {
        camera.matrix.multiply(this.movement);

        const     m2T = camera.matrix.elements.slice(12,15);
        const deltaMT = new Vector3(m2T[0]-m1T[0], m2T[1]-m1T[1], m2T[2]-m1T[2]);

        this.velocity.add(deltaMT.multiplyScalar(0.1));

        const elements = camera.matrix.elements 
              
              elements[12] -= deltaMT.x;
              elements[13] -= deltaMT.y;
              elements[14] -= deltaMT.z;

              elements[12] += this.velocity.x;
              elements[13] += this.velocity.y;
              elements[14] += this.velocity.z;
        
        camera.updateMatrixWorld(true);
    }

    private handleKeyboardCameraRotation(camera: Camera) {
        this.rotation.identity();

        this.keyRotationVelocity.x -= this.keys.ArrowDown ? 0.0025 :0 - (this.keys.ArrowUp ? 0.0025 : 0);

        this.keyRotationVelocity.y -= this.keys.ArrowRight ? 0.0025 :0 - (this.keys.ArrowLeft ? 0.0025 : 0);

        this.keyRotationVelocity.x = Math.max(-0.025, Math.min(0.025, this.keyRotationVelocity.x*0.92));

        this.keyRotationVelocity.y = Math.max(-0.025, Math.min(0.025, this.keyRotationVelocity.y*0.92));

        this.rotation.makeRotationFromEuler(
            new Euler(this.keyRotationVelocity.x, 
                      this.keyRotationVelocity.y, this.roll.z/35))

        camera.matrix.multiply(this.rotation);
    }

    private calculateMoveVector() {
        this.moveVector.set(0,0,0);

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

            if (this.ctx3.camera.matrix.elements[13] > 2) {
                this.enableFlying = true;
            }
        }

        this.moveVector.x -= this.touch.dx / 2.0;
        this.moveVector.z -= this.touch.dy / 2.0;
    }

    private calculateRotationVector() {
        this.roll.z = 0;

        if (this.keys.q) {
            this.rollVelocity += 0.05;        
        }
        if (this.keys.e) {
            this.rollVelocity -= 0.05;
        }


        // this.rollVelocity -= this.mouse.dx / 1000;
        this.rollVelocity *= 0.95;

        this.roll.z += this.rollVelocity
    }
}
