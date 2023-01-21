import { Camera, Euler, Quaternion } from "three";

export class GyroscopeControl {

    public x = 0;
    public y = 0;
    public z = 0;
    
    public isAvailable = false;

    public init(camera: Camera) {
        window.addEventListener('deviceorientation', (event) => {
            this.isAvailable = !!event.alpha || !!event.beta || !!event.gamma;
            this.x = event.alpha || 0;
            this.y = event.beta  || 0;
            this.z = event.gamma || 0;

        })
    }

}