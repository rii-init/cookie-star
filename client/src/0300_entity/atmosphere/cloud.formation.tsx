import { Cloud } from "../../0100_element/x10_fluid/manifold/cloud"

export let cloud_formation = () => {
    return (
        <>
           {
                new Array(5).fill(0).map((_, i) => {
                    return (
                        <Cloud key={i}></Cloud>
                    )

                })
           }
        </>
    )
}