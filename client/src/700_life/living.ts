/****
 * 
 * Space is eternal. 
 * Such is Life.
 * 
 */
export interface Living {
    name:             string,
    biography: Record<string, any>,

    velocity:        THREE.Vector3,
    angularVelocity: THREE.Quaternion,
        
    form:            JSX.IntrinsicElements["mesh"]
}