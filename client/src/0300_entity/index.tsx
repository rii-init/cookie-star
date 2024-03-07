import { RayGrab } from "@react-three/xr";
import React from "react";
import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { Components } from "../0700_life/components";


// 
function registerComponents(components: ReactNode, state: Record<string, any>) {
	// get mesh position and rotation and geometry size and shape
	
	return Children.map(components, (geometryOrMaterial) => {
		if (!React.isValidElement(geometryOrMaterial)) { 
			return geometryOrMaterial;
		}

        // TODO: get geometryType from state object, for this entity
        const geometryType = (geometryOrMaterial as React.ReactElement).type;

		if (typeof geometryType === "string" && 
		    ["boxGeometry", "sphereGeometry", "cylinderGeometry"].includes(geometryType)) {
				let shape: "box" | "sphere" | "cylinder" = "box";

				if (geometryType === "sphereGeometry") {
					shape = "sphere";
				}

				if (geometryType === "cylinderGeometry") {
					shape = "cylinder";
				}

                state.geometry = shape;

		}

        return geometryOrMaterial;
		
	})

}

export interface EntityProps {
    id?:   string;
    name?: string;

    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?:   [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

    children: ReactNode;

    editMode?: boolean;
    magnetic?: boolean;
}

const EditableEntiy = (p: EntityProps) => {

    return (
        <RayGrab>
        <mesh position={p.position} rotation={p.rotation}>
          { p.children }
        </mesh>
        </RayGrab>
    )
}


export function initComponents(p: EntityProps): Components {
    return {
        position: p.position,
        rotation: p.rotation
    }
}

export const Entity = (p: EntityProps) => {
    const [state, setState] = React.useState(initComponents(p));


    if (p.editMode) {
        return (
            <EditableEntiy position={p.position} rotation={p.rotation}>
                { registerComponents(p.children, state) }
            </EditableEntiy>
          )
    }


    return (
        <mesh position={p.position} rotation={p.rotation} >
            { registerComponents(p.children, state) }
        </mesh>
    )
}
