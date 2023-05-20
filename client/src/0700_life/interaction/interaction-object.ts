import { Mesh } from "three";
import { InteractionResponse } from "./interaction-response";
import { InteractionState } from "./interaction-state";

export class InteractionObject {

    constructor(
        public  mesh:     Mesh,
        public  response: InteractionResponse,
        private state:    InteractionState
    ) { }

    public actuate(params: any) {
        this.response.actuate(params, this.mesh);
    }

}