import { Group } from "three";
import { xRControllerState } from "./climbing-controls";
import { Universe } from "../../0000_concept/universe";
import { diagnosticState } from "../../0000/r3f-debug";


export function setXRControllerBaseMatrixFromInputSources(inputSources: any) {
    for (const source in inputSources) { 
        xRControllerState.handedness[inputSources[source].handedness as "left" | "right" | "none"].baseMatrix 
                                   = inputSources[source].gripSpace.baseMatrix;


        diagnosticState.addMessage("Paws:" + inputSources[source].gripSpace.baseMatrix
                                    .slice(12, 15)
                                    .map((v: number) => v.toFixed(2)).join(", "));
    }
}

export function XRControllerState({ session, player  }: { session: any, player: Group | null }) {

    // Universe.user_controls.xr_player = player;

    // setXRControllerBaseMatrixFromInputSources(session.inputSources);
    
    return <></>;
}