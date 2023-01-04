import THREE from "three";
import { UwUid } from "../000/util";
import { Ego } from "../000_concept/ego";
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
        this.velocity        = living.velocity; 
        this.angularVelocity = living.angularVelocity; 
        this.embodyment      = living.embodyment; 
    }

    setEgo(ego: Ego): void {
        ego.register(this);
    }

    public name:             string;
    public biography: Record<string, any>;

    public velocity:        THREE.Vector3;
    public angularVelocity: THREE.Quaternion;
        
    public embodyment:      JSX.IntrinsicElements["mesh"]

}