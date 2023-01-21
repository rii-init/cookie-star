import { Camera, Euler, Matrix4, Mesh, Raycaster, Vector2, Vector3 } from "three";
import { CTX3 } from "../../0000_api/three-ctx";
import { Universe } from "../../0000_concept/universe";
import { StaticGeometries } from "../physical/static.geometries";
import { GamepadControl } from "./gamepad.control";
import { GyroscopeControl } from "./gyroscope.control";
import { KeyboardState } from "./keyboard.control";
import { MouseState } from "./mouse.control";
import { MouseScrollControl } from "./mouse.scroll.control";
import { PageControl } from "./page-control";
import { ScrollControl } from "./scroll.control";
import { TouchControl } from "./touch.control";
import { TouchScrollControl } from "./touch.scroll.control";


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
  
    public gamepad  = new GamepadControl(this);
    public touch    = new TouchControl();
    public mouse    = new MouseState();
    public keys     = new KeyboardState();
    public gyro     = new GyroscopeControl();

    public staticGeom = new StaticGeometries();

    public cursorHidden = false;
    public cursorActivated = 0;

    public page = PageControl;

    private onScroll = (delta: number) => {
        PageControl.lastScroll = PageControl.scroll;
        PageControl.scroll = delta;
        //this.moveVector.z += ((PageControl.scroll - PageControl.lastScroll) / 20000);    
    }

    public scrollControl = new ScrollControl(
        this.touch,
        new MouseScrollControl(),
        new TouchScrollControl(this.touch)
    )


    constructor(ctx3: CTX3) {
        this.ctx3 = ctx3;

        this.keys.init();
        this.mouse.init();
        
        ctx3.camera.matrix.elements[13]  = 1.6;
        ctx3.camera.matrix.elements[14]  = 1.5;
        
        ctx3.camera.matrixAutoUpdate = false;

        this.keys.addKeyUpHandler((key) => {
            if (key.key === "Escape") {
                this.mouse.isLocked = false;
                //document.querySelector(".App")?.setAttribute("class", "App");
            }
        })

        this.mouse.setCanvas(Universe.canvas);

        this.scrollControl.addOnScrollHandler((y: number) => {
            this.velocity.z = y/-500;
            this.enableFlying = true;
        });

    }

    public handlePointerOver = (mesh: Mesh) => {
        this.cursorActivated = 0.0;
    }

    public handleOverOut = (mesh: Mesh) => {
        this.cursorActivated = 0.1;
    }

    public update(delta: number) {
        this.mouse.dx /= 1.15;
        this.mouse.dy /= 1.15;

        if (!Universe.xrMode) {
            this.calculateMoveVector();
            this.calculateRotationVector();
            this.calculatePosition(delta);
        }
    }

    private calculatePosition(delta: number) {
        const camera = this.ctx3.camera;
        const move   = this.moveVector.multiplyScalar(delta);
        
        const    m1T = camera.matrix.elements.slice(12,15);

        this.movement.identity();        
        this.movement.makeTranslation(move.x, move.y, move.z);

        this.rotation.identity(); 
        this.rotation.makeRotationFromEuler(new Euler(this.mouse.dy/-310, this.mouse.dx/-310, this.roll.z/35))
        camera.matrix.multiply(this.rotation);

        this.handleKeyboardCameraRotation(camera);
        this.handleGyroRotation(camera);

        camera.matrix.multiply(this.rotation);
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
              elements[14] += this.velocity.z + PageControl.scroll-PageControl.lastScroll;

        this.staticGeom.collision(this, camera, this.velocity, delta)
        

        // Terresterial movement
        if (!this.enableFlying) {
            // Gravity
            this.velocity.y -= 0.0025;
        }
        
        camera.updateMatrixWorld(true);
    }

    private handleGyroRotation(camera: Camera) {
        if (this.gyro.isAvailable) {
            camera.matrix.makeRotationFromEuler(new Euler(this.gyro.x, this.gyro.y, this.gyro.z));
        }
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