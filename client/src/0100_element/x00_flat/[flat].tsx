import * as React from 'react';
import { FrontSide } from "three";
import { Universe } from '../../0000_concept/universe';
import { SequenceContext } from '../200_sequence/sequence';

export interface FlatProps {
    children: React.ReactNode;
    position?: [number, number, number];
    size?:     [number, number];
    rotation?: [number, number, number];
    matrix?:   [number, number, number, number, 
                number, number, number, number, 
                number, number, number, number, 
                number, number, number, number];
}

export let Flat = (props: FlatProps) => {
        const value = React.useContext(SequenceContext);

        return (
            <mesh position={props.position}
                  rotation={props.rotation 
                                ? props.rotation 
                                : [Math.PI/2, 0, 0]} 
                    matrix={props.matrix}
            >
                <planeBufferGeometry args={props.size} />            
                <meshLambertMaterial color={Universe.colors.accent} 
                                     side={FrontSide} />
            </mesh>
        );
    
    };