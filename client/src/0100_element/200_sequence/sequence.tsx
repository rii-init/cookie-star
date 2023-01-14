import React from "react";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";

// Structural Sequence:

export interface SequenceProps {
    direction: "x" | "y" | "z",
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

function positionForDirection(direction: "x" | "y" | "z", padding: number, index: number) {
    switch (direction) {
        case "x":
            return [index*(1+padding),0,0];
        case "y":
            return [0,index*(1+padding),0];
        case "z":
            return [0,0,index*(1+padding)];
    }
}
export const SequenceContext = React.createContext({});

export const Sequence = (props: SequenceProps) => {

    return (
        <SequenceContext.Provider value={{direction: props.direction}}>
        <group position={props.position || [0,0,0]}>
            {
                props.border 
                ? React.Children.map(props.children, (child, index) => {
                return (
                    <mesh key={index} 
                     position={positionForDirection(
                            props.direction, 
                            props.itemPadding || 0, 
                            index)}>
                        <boxBufferGeometry args={shapeForDirection(props.direction)} />
                        <meshBasicMaterial color={props.color || SyntaxHighlight.Sequence} />
                        {child}
                    </mesh>
                )
                })
                : React.Children.map(props.children, (child, index) => {
                    return (
                        <group key={index} 
                         position={positionForDirection(props.direction, 
                                                        props.itemPadding || 0, 
                                                        index)}>
                            {child}
                        </group>
                    )
                })
            }
            { props.border ? 
                <mesh position={positionForDirection(props.direction, props.itemPadding || 0, 0)}>
                    <boxBufferGeometry args={[0.1,1,1]} />
                    <meshBasicMaterial color={props.color || SyntaxHighlight.Sequence} />
                </mesh> 
                : null 
            }
            { props.border ?
                <mesh position={positionForDirection(props.direction, 
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