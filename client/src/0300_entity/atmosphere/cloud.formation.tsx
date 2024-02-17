import { Vector3 } from "three";
import { Cloud } from "../../0100_element/x10_fluid/manifold/cloud"

export let CloudFormation = () => {
    const zero3 = new Vector3(0, 0, 0);

    let previousRadius = 0;
    let previousPosition: Vector3;
    let           coords = [  3, 9, -25+Math.random()*-3];

    return (
        <>
           {
            new Array(7).fill(0).map((_, i) => {
                const radius = 4+Math.random()*4;
                const position = (previousPosition === undefined 
                                    ? zero3 
                                    : previousPosition).add(

                                 new Vector3((-0.5 + Math.random()) * 1.6, 
                                              -0.5 + Math.random(),
                                             (-0.75 + Math.random())      )
                                            .normalize()
                                            .multiplyScalar((radius + previousRadius) / 1.5 )
                                    );

                if (Math.random() > (0.8 - i/40)) {
                    position.multiplyScalar(1.5);
                }
                
                previousRadius = radius;
                previousPosition = position;

                return (
                    <Cloud key={i} radius={radius} 
                      position={     new Vector3(coords[0], coords[1], coords[2])
                                            .add(position).toArray()
                               }>
                    </Cloud>
                )
            })
           }
        </>
    )
}