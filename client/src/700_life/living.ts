/****
 * 
 * Space is eternal. 
 * Such is Life.
 * 
 */
export interface Living<Ego> {
    name:             string,
    biography: Record<string, any>,

    velocity:        THREE.Vector3,
    angularVelocity: THREE.Quaternion,
        
    embodyment:      JSX.IntrinsicElements["mesh"]
    
    setEgo(ego: Ego): void;
}