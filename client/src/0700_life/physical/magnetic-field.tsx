import React, { Children, ReactNode, useContext } from 'react';
import { MagnetismContext } from "../../App";
import { Magnetism } from './magnetism';

export interface MagneticFieldProps {
    children?: React.ReactNode;
    editable?: boolean;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    shape?: "box" | "sphere" | "cylinder";
}

// 
function registerGeometries(mesh: any, magnetism: Magnetism) {
	// get mesh position and rotation and geometry size and shape
	
	Children.map(mesh.props.children, (geometryOrMaterial) => {
		if (!React.isValidElement(geometryOrMaterial)) { 
			return geometryOrMaterial;
		}

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

				magnetism.registerMagnet({
					position: mesh.props.position,
					rotation: mesh.props.rotation,
					shape: shape as "box" | "sphere" | "cylinder",
					dimensions: (geometryOrMaterial as any).props.args
				})
		}
		
	})


	return mesh;
}

export const MagneticField = (p: MagneticFieldProps) => {

	const magnetism = useContext(MagnetismContext);
	
    // check if editable and if RayGrab is child of MagneticField
    if (p.editable) {
	// get mesh position and rotation and geometry size and shape from child of RayGrab
		return (
			<>
				{
					Children.map(p.children, (child) => {
						if (!React.isValidElement(child)) { 
							return child;
						}

						return (
							<>
								{ Children.map(child.props.children, (mesh) => registerGeometries(mesh, magnetism)) }
							</>
						);
					})
				}	
			</>
		)
		
    } else {

		return (
			<>
				{ Children.map(p.children, (mesh) => registerGeometries(mesh, magnetism)) }
			</>
		);
	}

}
