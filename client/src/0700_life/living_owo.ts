import THREE from "three";
import { UwUid } from "../0000/util";
import { Ego } from "../0000_concept/ego";
import { Living } from "./living";

/**
 * 
 *  OwO ..what's dis? 
 * 
 */
export class LivingOwO implements Living<Ego> {
    
    constructor(
        living: Living<Ego>
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

    setEgo(ego: Ego): void {
        ego.register(this);
    }

    public name:             string;
    public biography: Record<string, any>;

    public position:        THREE.Vector3;
    public velocity:        THREE.Vector3;
    public angularVelocity: THREE.Quaternion;
        
    public embodyment:      JSX.IntrinsicElements["mesh"]

}