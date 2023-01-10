import { ElementModel } from "../../0000_concept/000_element";
import { ContainerService } from "../../0000_concept/100_container-service";
import { SequenceElement } from "./sequence-element";

export class SequenceContainer implements ContainerService<SequenceElement> {
    register(service: ElementModel<any>): void {
        
        
        throw new Error("Method not implemented.");
    }
    elements: SequenceElement[] = [];
}