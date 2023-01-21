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

             // create a new Euler rotation using the device's orientation data
            var euler = new Euler(this.y, this.x, this.z, 'YXZ');

            // create a quaternion from the euler angles
            var quaternion = new Quaternion();
            quaternion.setFromEuler(euler);

            // set the camera's quaternion to the calculated quaternion
            camera.quaternion.copy(quaternion);

        })
    }

}