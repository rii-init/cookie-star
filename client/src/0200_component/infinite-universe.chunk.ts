import THREE, { Vector3 } from "three";

export class InfiniteUniverseChunk {
    public coords = new Vector3(0,0,0);
    public id = [0,0,0]
    public mesh: THREE.Group = new THREE.Group();
}