import React from "react";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";

// Structural Sequence:

export interface SequenceProps {
    direction: "x" | "y" | "z",
    polarity: 1  | -1,
    xFunction?: (d: number) => number,
    yFunction?: (d: number) => number,
    zFunction?: (d: number) => number,
    itemPadding?: number,
    elements?: string[]
    children?: React.ReactNode,
    position?: [number, number, number]
    color?: [number, number, number]
    border?: boolean
}

function shapeForDirection(direction: "x" | "y" | "z") {
    switch (direction) {
        case "x":
            return [0.1,0.5,0.5];
        case "y":
            return [0.5,0.1,0.5];
        case "z":
            return [0.5,0.5,0.1];
    }
}

function positionForDirection(xFunction = (x: number)=>0, yFunction=(y: number)=>0, zFunction = (z: number)=>0,
	                      direction: "x" | "y" | "z", polarity: 1 | -1, padding: number, index: number) {
    switch (direction) {
        case "x":
            return [polarity * index * (1+padding), yFunction(index),  zFunction(index)];
        case "y":
            return [xFunction(index), polarity * index * (1+padding),  zFunction(index)];
        case "z":
            return [xFunction(index), yFunction(index), polarity * index * (1+padding)];
    }
}
export const SequenceContext = React.createContext({});

export const Sequence = (props: SequenceProps) => {

    return (
        <SequenceContext.Provider value={{direction: props.direction}}>
        <group position={props.position || [0,0,0]}>
            {
                React.Children.map(props.children, (child, index) => {
		   return (
                        <group key={index} 
                         position={positionForDirection(props.xFunction, props.yFunction, props.zFunction,
				                        props.direction,
                                                        props.polarity,
				                        props.itemPadding || 0, 
                                                        index)}>
                            {child}
                        </group>
                    )
                })
            }
            { props.border ? 
                <mesh position={positionForDirection(undefined, undefined, undefined, props.direction, 
			                             props.polarity,
			                             props.itemPadding || 0, 0)}>
                    <boxBufferGeometry args={[0.1,1,1]} />
                    <meshBasicMaterial color={props.color || SyntaxHighlight.Sequence} />
                </mesh> 
                : null 
            }
            { props.border ?
                <mesh position={positionForDirection(undefined, undefined, undefined, props.direction, 
						     props.polarity,
			                             props.itemPadding || 0,
                                                     props.elements 
                                                        ? props.elements.length-1
                                                        : React.Children.count(props.children)-1
                                                        )}>
                    <boxBufferGeometry args={[0.1,1,1]} />
                    <meshBasicMaterial color={props.color || SyntaxHighlight.Sequence} />
                </mesh>
                : null 
            }
        </group>
        </SequenceContext.Provider>
    )
}
