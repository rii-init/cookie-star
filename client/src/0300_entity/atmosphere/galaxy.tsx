import { Star } from "../../0100_element/circle/sphere/manifold/star"

export let galaxy = () => {
    return (
        <>
            {
                new Array(100).fill(0).map((_, i) => {
                    return (
                        <Star key={i}></Star>
                    )

                })
                
            }
            
        </>
    )
}