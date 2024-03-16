import React, { ReactNode, cloneElement } from 'react';

export const RotationOrigin = (props: {
    origin:   [number, number, number], 
    rotation: [number, number, number], 
    children: ReactNode
}) => {
  
  const object3D = 
    props.children 
      ? cloneElement(props.children as React.ReactElement<any>, { position: [0,0,0] })
      : null;

  const outerPosition =  (props.children as any)?.props
    ? (props.children as any).props.position 
    : null

  return (
    <group  rotation={props.rotation}
            position={outerPosition}>
      <group position={props.origin}>
        {object3D}
      </group>
    </group>
  );
};

export default RotationOrigin;