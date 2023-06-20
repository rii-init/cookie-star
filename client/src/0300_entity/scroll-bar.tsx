import { useEffect, useState } from "react";
import { Universe } from "../0000_concept/universe";
import { Vector3 } from "three";

let drag = false;

export const ScrollBar = (props: {position: [number, number, number]}) => {

    const frameHeight      = 5;
    const baseButtonHeight = 5;
    
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
            positionSub.unsubscribe();
        }
    }, [])


    const buttonHeight = baseButtonHeight / scrollDomain;
    const buttonPosition =  frameHeight / 2 
                            - ( ((scrollDistance / scrollDomain) * (frameHeight - buttonHeight)) ) 
                            - (buttonHeight / 2); 


    function handleManualScroll(e: {point: Vector3}) {
        const cameraY = Universe.ctx3?.camera.matrix.elements[13] || 0;

        const invertedPosition = frameHeight - ((e.point.y - cameraY) + frameHeight / 2);
        
        const distance = (invertedPosition  / frameHeight) * scrollDomain; //((frameHeight - (e.point.y - cameraY) - frameHeight / 2) / frameHeight) * scrollDomain;
     
        Universe.user_controls?.scroll(distance);
    }

    function onClick(e: {point: Vector3}) {
        handleManualScroll(e);
    }

    function onPointerMove(e: {point: Vector3}) {
        if (drag) {
            handleManualScroll(e);
        }
    }

    function onPointerDown() { drag = true;  }
    function onPointerUp() { drag = false; }

    return (
        <group position={[ position[0] + 5, position[1], position[2] - 5]}>
            <mesh onClick={(e: {point: Vector3}) => onClick(e)}
            onPointerMove={(e: {point: Vector3}) => onPointerMove(e)}
            onPointerDown={() => onPointerDown()}
              onPointerUp={() => onPointerUp()}
            
            >
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