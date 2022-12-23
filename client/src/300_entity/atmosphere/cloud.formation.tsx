import { Cloud } from "../../100_element/fluid/manifold/cloud"

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