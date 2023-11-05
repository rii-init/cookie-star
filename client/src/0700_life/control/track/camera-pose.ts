import { Vector3 } from 'three';

export interface CameraPose<T = Vector3> {
    position: T;
    target:   T;
}
