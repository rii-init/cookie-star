
import THREE from "three";
import { UwUid } from "../0000/util";
import { Self } from "../0000_concept/self";
import { Living } from "./living";

/**
 * 
 * UwU
 * 
 */
export class LivingUwU implements Living<Self<any>> {
    
    public setEgo(ego: Self<any>) {
        ego.register(this); 
    }

    constructor(
        id:     string = UwUid(),
        living: Living<Self<any>>
    ) { 
        this.name            = living.name;  
        this.biography       = living.biography;
        this.position        = living.position; 
        this.velocity        = living.velocity; 
        this.angularVelocity = living.angularVelocity; 
        this.embodyment      = living.embodyment; 
    }
    
    action(act: any): void {
        throw new Error("Method not implemented.");
    }
    update(matrix: number[]): void {
        throw new Error("Method not implemented.");
    }

    private ego:             Self<any> | null = null;
    public  position:        THREE.Vector3;
    public  velocity:        THREE.Vector3;
    public  angularVelocity: THREE.Quaternion;       
    public  embodyment:      JSX.IntrinsicElements["mesh"]
    public  name:             string;
    public  biography: Record<string, any>;
}