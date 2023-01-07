import { Euler, Matrix4, Vector3 } from "three";
import { CTX3 } from "../../0000_api/three-ctx";
import { Universe } from "../../0000_concept/universe";
import { KeyboardState } from "./keyboard.control";
import { MouseState } from "./mouse.control";


export class UserCTL {
    
    private ctx3: CTX3;
    
    private movement   = new Matrix4();
    private rotation   = new Matrix4();
    public  roll       = new Vector3(0, 0, 0);
    public  moveVector = new Vector3(0, 0, 0);
    public  velocity   = new Vector3(0, 0, 0);


    public mouse = new MouseState();
    public keys  = new KeyboardState( );

    constructor(ctx3: CTX3) {
        this.keys.init();
        this.mouse.init();
        
        this.ctx3 = ctx3;
        ctx3.camera.matrixAutoUpdate = false; 
        ctx3.camera.position.set(0,1,0);
        
        this.keys.addKeyUpHandler((key) => {
            if (key.key === "Escape") {
                this.mouse.isLocked = false;
            }
        })

        this.mouse.setCanvas(Universe.canvas);

        
    }

    public update(delta: number) {
        this.mouse.dx /= 1.15;
        this.mouse.dy /= 1.15;

        this.calculateMoveVector();
        this.calculateRotationVector();
        this.calculatePosition(delta);
    }

    private calculatePosition(delta: number) {
        const camera   = this.ctx3.camera;
        const move = this.moveVector.multiplyScalar(delta);
        
        this.movement.identity();        
        this.movement.makeTranslation(move.x, move.y, move.z);

        this.rotation.identity(); 
        this.rotation.makeRotationFromEuler(new Euler(this.mouse.dy/-310, this.mouse.dx/-310, this.roll.z/35))
        
        camera.matrix.multiply(this.rotation);
        camera.matrix.multiply(this.movement);
        camera.updateMatrixWorld(true);
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
            this.moveVector.y = 1;
        }
    }

    private calculateRotationVector() {
        this.roll.z = 0;

        if (this.keys.q) {
            this.roll.z = 1;        
        }
        if (this.keys.e) {
            this.roll.z = -1;
        }
    }
}