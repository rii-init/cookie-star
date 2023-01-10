import React from "react";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";

export interface SequenceProps {
    direction: "x" | "y" | "z",
    elements?: string[]
    children?: React.ReactNode
}

function shapeForDirection(direction: "x" | "y" | "z") {
    switch (direction) {
        case "x":
            return [0.1,1,1];
        case "y":
            return [1,0.1,1];
        case "z":
            return [1,1,0.1];
    }
}

function positionForDirection(direction: "x" | "y" | "z", index: number) {
    switch (direction) {
        case "x":
            return [index,0,0];
        case "y":
            return [0,index,0];
        case "z":
            return [0,0,index];
    }
}


export const Sequence = (props: SequenceProps) => {
    return (
        <group>
            {React.Children.map(props.children, (child, index) => {
                return (
                    <mesh key={index}>
                        <boxBufferGeometry args={shapeForDirection(props.direction)} 
                                    position={positionForDirection(props.direction, index)}
                        />
                        <meshBasicMaterial color={SyntaxHighlight.Sequence} />
                        {child}
                    </mesh>
                )
            })}
            <mesh>
                <boxBufferGeometry args={[0.1,1,1]} 
                            position={positionForDirection(props.direction, 0)}
                />
                <meshBasicMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
            <mesh>
                <boxBufferGeometry args={[0.1,1,1]} 
                            position={positionForDirection(props.direction, 
                                        props.elements 
                                        ? props.elements.length-1
                                        : React.Children.count(props.children)-1
                                        )}
                />
                <meshBasicMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
        </group>
    )
}