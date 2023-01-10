import { ElementModel } from "./000_element";

export interface ContainerService<Element> {
    register(service: ElementModel<any>): void;
    elements: Element[];
} 

