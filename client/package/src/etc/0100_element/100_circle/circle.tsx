// Structural Circle:

import React from "react"
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"


export interface CircleProps {
    axes: "xz" | "xy" | "zy",
    elements?: string[]
    children?: React.ReactNode
}

function positionForAxes(axes: "xz" | "xy" | "zy", index: number, scale = 3) {
    switch (axes) {
        case "xz":
            return [Math.sin(index) * scale,0,Math.cos(index) * scale];
        case "xy":
            return [Math.sin(index) * scale, Math.cos(index) * scale, 0];
        case "zy":
            return [0, Math.sin(index) * scale, Math.cos(index) * scale];
    }
}

export const CircleContext = React.createContext({});

export const Circle = (props: CircleProps) => {
    return (
        <CircleContext.Provider value={{axes: props.axes}}>
        <group>
            {React.Children.map(props.children, (child, index) => {
                return (
                    <mesh key={index}>
                        <boxBufferGeometry args={[1,1,0.1]} 
                                       position={positionForAxes(props.axes, index)}
                        />
                        <meshBasicMaterial color={SyntaxHighlight.Sequence} />
                        {child}
                    </mesh>
                )
            })}
            <mesh>
                <boxBufferGeometry args={[0.1,1,1]} 
                            position={positionForAxes(props.axes, 0)}
                />
                <meshBasicMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
            <mesh>
                <boxBufferGeometry args={[0.1,1,1]} 
                            position={positionForAxes(props.axes, 
                                        props.elements 
                                        ? props.elements.length-1
                                        : React.Children.count(props.children)-1
                                        )}
                />
                <meshBasicMaterial color={SyntaxHighlight.Circle} />
            </mesh>
        </group>
        </CircleContext.Provider>
    )
}