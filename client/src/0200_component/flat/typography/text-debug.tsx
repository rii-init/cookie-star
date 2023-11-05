import { RefObject, useEffect, useState } from "react"
import { Mesh } from "three";

export function TextDebug(props: { meshRef: RefObject<Mesh | undefined> }) {

    const [dimensions, setDimensions] = useState({ width: 1.5, height: 1.5 });

    useEffect(
        () => {
            if (!props.meshRef                  || 
                !props.meshRef.current          ||
                !props.meshRef.current.geometry ||
                !props.meshRef.current.geometry.boundingBox
            ) return;

            setDimensions({
                width:  props.meshRef.current.geometry.boundingBox.max.x - props.meshRef.current.geometry.boundingBox.min.x,
                height: props.meshRef.current.geometry.boundingBox.max.y - props.meshRef.current.geometry.boundingBox.min.y
            })
        }, 
        [props.meshRef]
    )

    return (
        <mesh>
            <boxBufferGeometry args={[dimensions.width, dimensions.height, dimensions.width]} />
            <meshStandardMaterial color="#ffc000" wireframe={true} />
        </mesh>
    )
}