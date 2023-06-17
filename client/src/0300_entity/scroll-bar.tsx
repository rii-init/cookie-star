import { useEffect, useState } from "react";
import { Universe } from "../0000_concept/universe";
import { Vector3 } from "three";


export const ScrollBar = (props: {position: [number, number, number]}) => {

    const frameHeight      = 5;
    const baseButtonHeight = 2;
    
    const [scrollDomain, setScrollDomain]     = useState(0);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [position, setPosition]             = useState([0,0,0] as [number, number, number]);
    
    useEffect(() => {
        const domainSub   = Universe.state.scrolling.$scrollDomain.subscribe((domain: number) => setScrollDomain(domain));
        const distanceSub = Universe.state.scrolling.$distance.subscribe((distance: number) => {
            setScrollDistance(distance);
        });
        const positionSub = Universe.state.scrolling.$position.subscribe((position: [number, number, number]) => {
            setPosition(position);
        });
        return () => {
            domainSub.unsubscribe();
            distanceSub.unsubscribe();
        }
    }, [])


    const buttonHeight = baseButtonHeight / scrollDomain;
    const buttonPosition =  frameHeight / 2 
                            - ( ((scrollDistance / scrollDomain) * (frameHeight - buttonHeight)) ) 
                            - (buttonHeight / 2); 

    return (
        <group position={[ position[0] + 5, position[1], position[2] - 5]}>
            <mesh>
                <boxBufferGeometry args={[0.5, frameHeight, 0.25]} />
                <meshLambertMaterial color="white"    />
            </mesh>

            <mesh position={[0, buttonPosition, 0.25]}>
                <boxBufferGeometry args={[0.5, buttonHeight, 0.1]} />
                <meshBasicMaterial color="white"    />
            </mesh>

        </group>
        
    )


}