import React, { JSXElementConstructor, ReactElement, ReactNode, useContext, useEffect } from "react";
import { Group, Mesh } from "three";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { text } from "stream/consumers";
import { DiagnosticState, diagnosticState } from "../../0000/r3f-debug";
import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextSpan } from "../../0200_component/flat/typography/span";
import { wrapText } from "../../0000_concept/responsive-document";
import { Universe } from "../../0000_concept/universe";

// Structural Sequence:

export interface SequenceProps {
    elements?: string[]
    children?: React.ReactNode,
    
    direction: "x" | "y" | "z",
    polarity?:  1  | -1,

    buffer?: { size: number }

    xFunction?: (d: number) => number
    yFunction?: (d: number) => number
    zFunction?: (d: number) => number
    xRotationFunction?: (d: number) => number
    yRotationFunction?: (d: number) => number
    itemPadding?: number,
    
    position?: [number, number, number]
    rotation?: [number, number, number]

    staticLayout?: boolean
}

export function calculateBufferedItemVisibility(
    direction: "x" | "y" | "z",
    position: [number, number, number],
    bufferSize:     number,
    itemPosition:   number, 
    spacing:        number, 
    scrollDistance: number
) {
    const scrollingWindowSize = bufferSize * spacing;
    const absolute_itemPosition = itemPosition + position[ "xyz".indexOf(direction) ]; 

    return absolute_itemPosition > scrollDistance &&
           absolute_itemPosition < scrollDistance + scrollingWindowSize; 
}


function backgroundShapeForDirection(direction: "x" | "y" | "z"): [number, number, number] {
    switch (direction) {
        case "x":
            return [0.1,3,4];
        case "y":
            return [4,0.1,3];
        case "z":
            return [4,3,0.1];
    }
}

function backgroundPositionForDirection(direction: "x" | "y" | "z", position: [number, number, number]): [number, number, number] {
    switch (direction) {
        case "x":
            return [position[0]*0.5-0.25, -0.5, 0];
        case "y":
            return [-0.5, position[1]*0.5-0.25, 0];
        case "z":
            return [0, -0.5, position[2]*0.5-0.25];
    }
}

function positionForDirection(xFunction = (x: number)=>0, yFunction=(y: number)=>0, zFunction = (z: number)=>0,
	                      direction: "x" | "y" | "z", polarity: 1 | -1, padding: number, index: number): [number, number, number] {
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

function getPosition(props: SequenceProps, index: number) { 
    return positionForDirection(props.xFunction, props.yFunction, props.zFunction,
        props.direction,
        props.polarity    || 1,
        props.itemPadding || 0, index);
}


function computeLayout(direction: "x" | "y" | "z", group: THREE.Object3D, levels = 0) {
    // check if each child is a mesh or group:
    // if it's a mesh, then we can just use the bounding box to compute the layout
    // if it's a group, then we need to compute the layout of the group, and then use that to compute the layout of the parent group
    let height = 0;
    let width = 0;

    group.children.forEach((child) => {
     
        if (child.type == "Mesh") {
            (child as Mesh).geometry.computeBoundingBox();
            const box = (child as Mesh).geometry.boundingBox;
            
            if (box != null) {

                if (direction == "y") {
                    if (box.max.y !== -Infinity) {
                        height += box.max.y - box.min.y;
                    }
                }
            
            }
            
        } else if (child.type == "Group") {
            let tallestItem = 0;
            let lastWidth = 0;

            child.children.forEach((g_child, g_idx: number) => {

                if (g_child.type == "Mesh") {
                    (g_child as Mesh).geometry.computeBoundingBox();
                    const box = (g_child as Mesh).geometry.boundingBox;
                    
                    if (box != null) {

                        if (direction == "y") {
                            if (box.max.y !== -Infinity) {
                                height += box.max.y - box.min.y;
                            } 
                        } else {
                            if (box.max.y !== -Infinity) {
                                tallestItem = Math.max(tallestItem, (box.max.y - box.min.y));
                            }
                        }

                        console.log("2nd level Mesh.parent.userData: ", child.userData)
                        if (child.userData.direction == "x") {
                            
                            console.log("2nd level Mesh is in a horizontal sequence, with lastWidth: ", lastWidth);
                            if (box.max.x !== -Infinity) {
                                
                                if (lastWidth > 0) {
                                    g_child.position.x += lastWidth;
                                    g_child.updateMatrixWorld(true);
                                }
                                
                                lastWidth = box.max.x - box.min.x;
                                console.log("lastWidth: ", lastWidth);
                                width += lastWidth;
                            } 
                        }
                    }

                } else if (g_child.type == "Group") {

                    height += computeLayout(g_child.userData.direction, g_child, levels+1);
                }
 
            });

            height += tallestItem;

        }
    });

    if (levels == 0 || direction == "y") {
        group.position.y -= height * 0.5;
        group.updateMatrixWorld(true);
    }

    if (levels > 1 || direction == "x") {
        console.log("levels > 1 and direction='x' ", group);
    }

    return height;
}

export const Sequence = (props: SequenceProps) => {
    const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait");

    useEffect(() => { 
        const orientationSub = Universe.state.responsiveDocument.$orientation.subscribe((orientation) => {
            setOrientation(orientation);
        })

        return () => {
            orientationSub.unsubscribe();
        }
    }, []);

    let dynamicIndex = 0;

    const groupRef = React.useRef<THREE.Group>(null);

    useEffect(() => {
        if (!props.staticLayout && groupRef.current) {
            computeLayout(props.direction, groupRef.current);
        }
    }, [groupRef]);

    return (
        <SequenceContext.Provider value={{direction: props.direction}}>
        <group position={props.position || [0,0,0]}
               rotation={props.rotation || [0,0,0]}
               ref={groupRef}
               userData={{direction: props.direction}}
        >
        {
            React.Children.map(props.children, (element, index) => {
            let textLines = null;
            if (element &&        (element as ReactElement<any>).type
                        && typeof (element as ReactElement<any>).type === 'function') 
            {                
                const componentType = ((element as ReactElement<any>).type as Function);

                if (([TextDiv, TextSpan] as Function[]).includes(componentType)) {
                    const lines = wrapText((element as any).props.children as string, "landscape"); //??? orientation);

                    if (lines && lines.length > 1) {
                        textLines = lines.map((line: string, index: number) => {
                        const lineElement = React.cloneElement(element as ReactElement<any>, {children: line});
                        
                        return (
                            <group key={dynamicIndex} 
                                   position={getPosition(props, dynamicIndex++)}
                                   rotation={[
                                       props.xRotationFunction ? props.xRotationFunction(dynamicIndex) : 0,
                                       props.yRotationFunction ? props.yRotationFunction(dynamicIndex) : 0,
                                       0]}
                            >
                                { lineElement }
                            </group>
                        )
                        });
                    }
                } 
            }

            if (textLines) {
                return (<> { textLines } </>)
            } 
            
            return React.cloneElement(element as ReactElement<any>, 
                { ...((element as any).props),
                    position: getPosition(props, dynamicIndex++),
                    rotation: [
                            props.xRotationFunction ? props.xRotationFunction(dynamicIndex) : 0,
                            props.yRotationFunction ? props.yRotationFunction(dynamicIndex) : 0,
                            0
                        ]
                })

		
            })
        }
        </group>
        </SequenceContext.Provider>
    )
}
