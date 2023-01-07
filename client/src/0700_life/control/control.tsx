import { Matrix4, Vector3 } from "three";
import { CTX3 } from "../../0000_api/three-ctx";
import { KeyboardState } from "./keyboard.control";
import { MouseState } from "./mouse.control";


export class MotorCortex {
    public static mouse = new MouseState();
    public static keys  = new KeyboardState();
    public moveVector   = new Vector3(0,0,0);
}

export class UserCTL {
    
    private ctx3: CTX3;
    private movement = new Matrix4();

    constructor(ctx3: CTX3) {
        MotorCortex.keys.init();
        MotorCortex.mouse.init();
        this.ctx3 = ctx3; 
        console.log("userCTL: ", ctx3.camera);
    }

    public update(delta: number) {
        this.calculateMoveVector();
        this.calculateRotationVector();
        this.calculatePosition(delta);
    }

    private calculatePosition(delta: number) {
        const camera   = this.ctx3.camera;
        const position = camera.position;
 
        this.movement.identity();
        this.movement.makeTranslation(position.x, position.y, position.z);
        this.movement.multiplyScalar(delta);
 
        camera.matrix.multiply(this.movement);
        camera.updateMatrix();
    }

    private calculateMoveVector() {
        let moveVector = new Vector3(0,0,0);
        if (MotorCortex.keys.w) {
            moveVector.z = -1;
        }
        if (MotorCortex.keys.s) {
            moveVector.z = 1;
        }
        if (MotorCortex.keys.a) {
            moveVector.x = -1;
        }
        if (MotorCortex.keys.d) {
            moveVector.x = 1;
        }
        if (MotorCortex.keys.r) {
            moveVector.y = 1;
        }
        if (MotorCortex.keys.f) {
            moveVector.y = -1;
        }
        if (MotorCortex.keys.shift) {
            moveVector.multiplyScalar(3);
        }
        if (MotorCortex.keys.space) {
            moveVector.y = 1;
        }

        return moveVector;
    }

    private calculateRotationVector() {
        // if (MotorCortex.keys.q) {
            
        // }
        // if (MotorCortex.keys.e) {
            
        // }
    }
}