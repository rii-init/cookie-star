import * as React from 'react';
import { Mesh, DoubleSide } from "three";
import { Universe } from '../../0000_concept/universe';

export interface FlatProps {
    children: React.ReactNode;
    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?:   [number, number, number, number, 
                number, number, number, number, 
                number, number, number, number, 
                number, number, number, number];
}

export let Flat = (props: FlatProps) => {
        
        return (
            <mesh position={[0, 0, 0]          } 
                  rotation={[Math.PI / 2, 0, 0]} 
                     scale={[1, 1, 1]          }>
      
                <planeBufferGeometry />            
                <meshBasicMaterial color={Universe.colors.accent as any} 
                                    side={DoubleSide} />
            </mesh>
        );
    
    };