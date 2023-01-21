export class GyroscopeControl {

    public x = 0;
    public y = 0;
    public z = 0;
    
    public isAvailable = false;

    constructor() {
        this.isAvailable = 'DeviceOrientationEvent' in window;
        if (this.isAvailable) {
            this.initDeviceOrientation();
        }
    }

    private initDeviceOrientation() {
        window.addEventListener('deviceorientation', (event) => {
            this.x = event.alpha || 0;
            this.y = event.beta  || 0;
            this.z = event.gamma || 0;
        })
    }

}