import { ContainerService } from "./100_container-service";

export interface ElementModel<Element> {
    register(service: ContainerService<any>): void
} 

