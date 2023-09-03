import React, { JSXElementConstructor, ReactElement, ReactNode, useContext, useEffect } from "react";
import { Box3, BoxHelper, Group, Mesh, Object3D, Vector3 } from "three";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { text } from "stream/consumers";
import { DiagnosticState, diagnosticState } from "../../0000/r3f-debug";
import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextSpan } from "../../0200_component/flat/typography/span";
import { wrapText } from "../../0000_concept/responsive-document";
import { Universe } from "../../0000_concept/universe";
import { useLocation } from "wouter";

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


function approximateR3FTextWidth(child: Mesh, direction: "x" | "y" | "z", width: number) {
    if ((child as any).__r3f) {
        const props = (child as any).__r3f.memoizedProps;
        
        if (props.text && props.text.length > 0) {
            // it's some text!!  we need to compute the width of the text
            
            if (direction == "x") {
                return          width + 1 + (props.text.length * 0.52 * props.scale[0]);
            } else {
                return Math.max(width,  1 + (props.text.length * 0.52 * props.scale[0]));
            }
        }
    }

    return width;
}


function approximateR3FTextHeight(child: Mesh, direction: "x" | "y" | "z", height: number) {
    if ((child as any).__r3f) {
        const props = (child as any).__r3f.memoizedProps;
        if (props.text && props.text.length > 0) {
            // it's some text!!  we need to compute the height of the text
            // to handle the async updating of the text geometry, 
            // It might require forking drei and adding a callback to the Text component,
            // For now, for the sake of simplicity, an approximation of the height is used:
            if (direction == "y") {
                return          height + (1.05 * props.scale[1]);
            } else {
                return Math.max(height,  (1.05 * props.scale[1]));
            }
        }
    }

    return height;
}



function  getGroupWidth(direction: "x" | "y" | "z", group: THREE.Group): number {
    let width = 0;

    group.children.forEach((child) => {
        if (child.type == "Mesh") {
            (child as Mesh).geometry.computeBoundingBox();
            const box = (child as Mesh).geometry.boundingBox;
            
            if (box != null && box.max.x !== -Infinity) {
                if (direction == "x") {
                    width += box.max.x - box.min.x;
                } else {
                    width = Math.max(width, box.max.x - box.min.x);
                }
            } else {
                const approximateWidth = approximateR3FTextWidth(child as Mesh, direction, width);
                
                console.log("direction: ",direction, "approximate width:", approximateWidth);
                width += approximateWidth;
            }
        } else if (child.type == "Group") {
            width += getGroupWidth(child.userData.direction, child as THREE.Group);
        }
    });

    return width;
}

function getGroupHeight(direction: "x" | "y" | "z", group: THREE.Group): number {
    let height = 0;
    
    group.children.forEach((child) => {
        if (child.type == "Mesh") {
            (child as Mesh).geometry.computeBoundingBox();
            const box = (child as Mesh).geometry.boundingBox;
            
            if (box != null && box.max.y !== -Infinity) {
                
                if (direction == "y") {
                    height += box.max.y - box.min.y;
                } else {
                    height = Math.max(height, box.max.y - box.min.y);
                }
            } else {
                const approximateHeight = approximateR3FTextHeight(child as Mesh, direction, height);
                console.log("direction: ",direction, "approximate height:", approximateHeight);
                
                height += approximateHeight;
            }

        } else if (child.type == "Group") {

            if (direction == "y") {
                height += getGroupHeight(child.userData.direction, child as THREE.Group);
            }
        }
    });

    return height;
}


function computeLayout(direction: "x" | "y" | "z", group: THREE.Object3D): void {
    // ⑂ check if each child is a mesh or group:
    // ▪ If it's a mesh, then we can just use the bounding box to compute the layout
    //       that is, if it's not a drei <Text> node, 
    //       which there doesn't seem to be EventDispatcher::dispatch for when the geometry is updated,
    //       so, we'll just approximate the width and height of the text for now.
    // ▪ If it's a group, then we need to compute the layout of the group, and then use that to compute the layout of the parent group
    let height = 0;
    let width = 0;
    
    let layout_position_x = 0;
    let layout_position_y = 0;

    let previousItem: Object3D | null = null;

    group.children.forEach((child, idx) => {
     
        if (idx > 0) {

            if (direction == "y" ) {
                
                child.position.y -= layout_position_y;
                child.updateMatrixWorld(true);
                //console.log("Update layout-Y📗 " + idx + " by", -layout_position_y, " to " + child.position.y);
            } else if (direction == "x") {

                if (previousItem)
                layout_position_x += previousItem.position.x;

                child.position.x += layout_position_x;
                child.updateMatrixWorld(true);
                console.log("Update layout-X📘 " + idx + " by", layout_position_x, " to " + child.position.x);
            }
        }

        if (child.type == "Mesh") {
            (child as Mesh).geometry.computeBoundingBox();
            const box = (child as Mesh).geometry.boundingBox;
            
            if (box != null) {

                if (direction == "y") {
                    if (box.max.y !== -Infinity) {
                        const itemHeight = box.max.y - box.min.y;

                        layout_position_y += itemHeight;
                        height += itemHeight;
                    } 
                    // else {
                    //     const approximateHeight = approximateR3FTextHeight(child as Mesh, direction, height);
                    //     console.log("direction: ",direction, "approximate height:", approximateHeight);
                        
                    //     layout_position_y += approximateHeight;
                    //     height += approximateHeight;
                    // }
                } else if (direction == "x") {
                    if (box.max.x !== -Infinity) {
                        const itemWidth = box.max.x - box.min.x;

                        layout_position_x += itemWidth;
                        width += itemWidth;
                    } else {
                        const approximateWidth = approximateR3FTextWidth(child as Mesh, direction, width);
                        
                        console.log("direction: ",direction, "approximate width:", approximateWidth);
                        layout_position_x += approximateWidth;
                        width += approximateWidth;
                    }
                }
            
            } 
            
        } else if (child.type == "Group") {
            const box = new BoxHelper( child, 0xffe000 );
    
            Universe.ctx3.scene.add( box );


            if (direction == "y") {
                const itemHeight = getGroupHeight(child.userData.direction, child as THREE.Group);
            
                height += itemHeight;
                layout_position_y += itemHeight;
            
            } 
            else if (direction == "x") {
                const itemWidth  = getGroupWidth(child.userData.direction, child as THREE.Group);

                console.log("x direction📘 itemWidth📦⇔", itemWidth, "layoutPositionX📘🏗", layout_position_x);

                width += itemWidth;
                layout_position_x += itemWidth;
            }

        }

        // todo: justification prop (left, center, right)
        if (idx === 0) {
            if (direction == "x") {
                // Left justified by default
                child.position.x += layout_position_x / 2.0;
                child.updateMatrixWorld(true);
            }
        }

        previousItem = child;
    });

    group.position.x -= width  * 0.5;
    //group.position.y -= height * 0.5;
    
    group.updateMatrixWorld(true);

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

    const [location] = useLocation();
    const groupRef = React.useRef<THREE.Group>(null);

    useEffect(() => {
        if (!props.staticLayout && groupRef.current) {
            computeLayout(props.direction, groupRef.current);     
        }
    }, [groupRef, location]);

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
                                   position={props.staticLayout ? getPosition(props, dynamicIndex++) : [0,0,0]}
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
                    position: (props.staticLayout || props.direction != "y") 
                                ? getPosition(props, dynamicIndex++) 
                                : [0,0,0],
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
