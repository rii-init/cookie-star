export class GyroscopeControl {

    public x = 0;
    public y = 0;
    public z = 0;

    constructor() {
        this.initDeviceOrientation();
    }

    private initDeviceOrientation() {
        window.addEventListener('deviceorientation', (event) => {
            this.x = event.alpha || 0;
            this.y = event.beta  || 0;
            this.z = event.gamma || 0;
        })
    }

}