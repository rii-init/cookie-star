/****
 * 
 * Space is eternal. 
 * Such is Life.
 * 
 */
export interface Living<Ego> {
    
    name:             string,
    biography: Record<string, any>,

    position:        THREE.Vector3,
    velocity:        THREE.Vector3,
    angularVelocity: THREE.Quaternion,
        
    embodyment:      JSX.IntrinsicElements["mesh"]
    
    setEgo(ego: Ego):         void;
    action(act: any):         void;
    update(matrix: number[]): void;
}