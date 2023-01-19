import { Cloud } from "../../0100_element/x10_fluid/manifold/cloud"

export let CloudFormation = () => {
    return (
        <>
           {
                new Array(7).fill(0).map((_, i) => {
                    return (
                        <Cloud key={i} position={[-10+Math.random()*20, 10, Math.random()*-20]}></Cloud>
                    )

                })
           }
        </>
    )
}