
import THREE from "three";
import { UwUid } from "../000/util";
import { Self } from "../000_concept/self";
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
        this.velocity        = living.velocity; 
        this.angularVelocity = living.angularVelocity; 
        this.embodyment      = living.embodyment; 
    }

    private ego:             Self<any> | null = null;
    public  velocity:        THREE.Vector3;
    public  angularVelocity: THREE.Quaternion;       
    public  embodyment:      JSX.IntrinsicElements["mesh"]
    public  name:             string;
    public  biography: Record<string, any>;
}