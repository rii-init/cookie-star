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

function registerMesh(parent: any, mesh: any, magnetism: Magnetism) {
	// get mesh position and rotation and geometry size and shape
	let shape: "box" | "sphere" | "cylinder" = "box", size = [1,1,1];

	Children.map(mesh.props.children, (geometryOrMaterial) => {
		if (!React.isValidElement(geometryOrMaterial)) { 
			return geometryOrMaterial;
		}

		if (geometryOrMaterial.type === "boxGeometry") {
			shape = "box";
			size = (geometryOrMaterial as any).props.args;
		}

		if (geometryOrMaterial.type === "sphereGeometry") {
			shape = "sphere";
			size = (geometryOrMaterial as any).props.args;
		}

		if (geometryOrMaterial.type === "cylinderGeometry") {
			shape = "cylinder";
			size = (geometryOrMaterial as any).props.args;
		}

		magnetism.registerMagnet({
			position: mesh.props.position,
			rotation: mesh.props.rotation,
			shape: shape as "box" | "sphere" | "cylinder",
			dimensions: size
		})

		return geometryOrMaterial;

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
								{ Children.map(child.props.children, (mesh) => registerMesh(child, mesh, magnetism)) }
							</>
						);
					})
				}	
			</>
		)
		
    } else {

		return (
			<>
				{ Children.map(p.children, (mesh) => registerMesh(p, mesh, magnetism)) }
			</>
		);
	}

}
