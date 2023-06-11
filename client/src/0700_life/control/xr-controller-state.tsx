import { xRControllerState } from "./climbing-controls";


export function setXRControllerBaseMatrixFromInputSources(inputSources: any) {
    for (const source in inputSources) { 
        xRControllerState.handedness[inputSources[source].handedness as "left" | "right" | "none"].baseMatrix 
                                   = inputSources[source].gripSpace.baseMatrix;
    }
}

export function XRControllerState({ session }: any) {

    setXRControllerBaseMatrixFromInputSources(session.inputSources);
    
    return <></>;
}