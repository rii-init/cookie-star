import { Star } from "../../0100_element/100_circle/cylinder/manifold/star"

export let Galaxy = () => {
    return (
        <group>
            {
                new Array(63).fill(0).map((_, i) => {
                    const theta = Math.random() * Math.PI,
                          phi   = Math.random() * Math.PI;

                    return (
                        <Star key={i} position={[
                            Math.sin(theta) * Math.cos(phi) * 100,
                            Math.sin(theta) * Math.sin(phi) * 100,
                            Math.cos(theta) * 100,
                        ]}></Star>
                    )

                })   
            }    
        </group>
    )
}