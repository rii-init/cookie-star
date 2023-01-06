import { Vector3 } from "three";
import { KeyboardState } from "./keyboard.control";
import { MouseState } from "./mouse.control";


export class MotorCortex {
    public static mouse = new MouseState();
    public static keys  = new KeyboardState();
    public moveVector   = new Vector3(0,0,0)
}

export class UserControls {
    constructor(ctx3: any) {
        MotorCortex.keys.init();
        MotorCortex.mouse.init();
    }


    public update() {
        this.calculateMoveVector();
        this.calculateRotationVector();
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