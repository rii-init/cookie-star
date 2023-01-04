import THREE from "three";
import { UwUid } from "../000/util";
import { Living } from "./living";

/**
 * 
 *  OwO ..what's dis? 
 * 
 */
export class LivingOwO implements Living {
    
    constructor(
        living: Living
    ) { 
        this.name            = living.name;  
        this.biography       = living.biography; 
        this.velocity        = living.velocity; 
        this.angularVelocity = living.angularVelocity; 
        this.embodyment      = living.embodyment; 
    }

    public name:             string;
    public biography: Record<string, any>;

    public velocity:        THREE.Vector3;
    public angularVelocity: THREE.Quaternion;
        
    public embodyment:      JSX.IntrinsicElements["mesh"]

}