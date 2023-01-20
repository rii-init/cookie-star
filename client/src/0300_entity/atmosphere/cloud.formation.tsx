import { Vector3 } from "three";
import { Cloud } from "../../0100_element/x10_fluid/manifold/cloud"

export let CloudFormation = () => {
    const cloudCenter = [-10, 9, -12];
    let        coords = [3, 
                            9, 
                        -10+Math.random()*-3];

    return (
        <>
           {
            new Array(7).fill(0).map((_, i) => {
                const delta = [cloudCenter[0] - coords[0], 0, cloudCenter[2] - coords[2]];

                coords = [coords[0] - delta[0] / 4, 10, coords[2] - delta[2] / 4];

                const radius = 4+Math.random()*8;

                const nextPosition = new Vector3(Math.random(),
                                    Math.random(),
                                    Math.random()
                                    )
                            .normalize()
                            .multiplyScalar(radius/2)
                return (
                    <Cloud key={i}
                        radius={radius} 
                      position={
                        new Vector3(coords[0], coords[1], coords[2])
                   .add(nextPosition).toArray()
                      }></Cloud>
                )
            })
           }
        </>
    )
}