import { Mesh } from "three";
import { InteractionVector } from "./interaction-vector";

export class InteractionResponse {
 
    public actuate(params: InteractionVector, mesh: Mesh) {
        // Override this method.
    }
    
} 