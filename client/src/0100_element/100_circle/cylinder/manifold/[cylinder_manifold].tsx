export interface CylinderManifoldProps {
    width: number
    height: number
    points: number
}

export const CylinderManifold = (props: CylinderManifoldProps) => {
    return (
            <cylinderGeometry attach="geometry" args={[
                1+2*props.points,
                2,  
                2, 
                props.width, 
                props.height
            ]} />
    );
};