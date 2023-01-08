import { Star } from "../../0100_element/100_circle/cylinder/manifold/star"

export let Galaxy = () => {
    return (
        <group>
            {
                new Array(63).fill(0).map((_, i) => {
                    return (
                        <Star key={i}></Star>
                    )

                })   
            }    
        </group>
    )
}