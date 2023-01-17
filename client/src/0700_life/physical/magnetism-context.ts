import { Magnet } from "./magnet";

export class MagnetismContext {

    private camera: THREE.Camera;
    private magnets: Magnet[] = [];

    constructor(camera: THREE.Camera) {
        this.camera = camera;
    }

    public registerMagnet(magnet: Magnet) {
        this.magnets.push(magnet);
    }

    public unregisterMagnet(magnet: Magnet) {
        this.magnets = this.magnets.filter(m => m !== magnet);
    }

    public update(delta: number) {
        for (let idx = this.magnets.length; idx--; idx >= 0) {

        }   
    } 
}