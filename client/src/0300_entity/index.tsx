import React, { useEffect } from "react";
import { Children, ReactNode } from "react";

import { SystemComponentState, SystemEntityState, systems } from "../0700_life/system";


export interface EntityProps {
    id?: string;
    name?: string;

    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

    children: ReactNode;
}


// 
function registerComponents(childrenOfMesh: ReactNode, state: EntityState, parentMesh: THREE.Mesh | THREE.Group) {
    // register components from children of entity (e.g. geometry, material, etc.)
    // this is a recursive function that will register all components of the children of the entity
    // Every three.js mesh is mapped to an Entity in the ECS model.
    // Every child of this mesh is either a component or sub-entity (with its own children).

    return Children.map(childrenOfMesh, (component, index) => {
        if (!React.isValidElement(component) || !state) {
            return component; // if it's something else, just return it
        }

        // check if component has children
        if (component.props.children && typeof component.props.children === "object") {
            // if so, register the children of the component
            const subEntityState = new EntityState();

            subEntityState.position = component.props.position || [0,0,0];
            subEntityState.rotation = component.props.rotation || [0,0,0];

            const subMesh = parentMesh?.children[index] as THREE.Mesh | THREE.Group;

            subEntityState.mesh = subMesh;

            registerComponents(component.props.children, subEntityState, subMesh);

        } else {
            const type = (component as any).type.name || (component as React.ReactElement).type;

            if (typeof type === "string") {
                
                // check if there's an associated system for this component
                if (systems.byComponent[type as string]) {
                    // if so, register the component with the system
                    systems.byComponent[type as string].registerComponent(component, state, parentMesh);
                }
            }
        }


        return component;
    })
}


function unRegisterEntityTree(state: EntityState) {
    // unregister components at this entity node
    for (const systemName in state.systemEntityState) {
        console.log("trying to remove system state for: ", systemName, state.systemEntityState);

        if ((state.systemEntityState as Record<string ,any>)[systemName]) {
            (state.systemEntityState as Record<string ,any>)[systemName].remove();
        }
    }

    // unregister components at child entity nodes
    for (const subEntityState of state.subEntityState) {
        unRegisterEntityTree(subEntityState);
    }
}


export class EntityState {

    position: [number, number, number];
    rotation: [number, number, number];
    geometry: any = null;
    material: any = null;

    mesh: THREE.Mesh | THREE.Group | null = null;

    subEntityState:    EntityState[]      = [];
    systemEntityState: SystemEntityState;

    constructor() { 

        this.position = [0,0,0];
        this.rotation = [0,0,0];
        
        this.systemEntityState = new SystemEntityState();
    }
}


export const Entity = (p: EntityProps) => {
    const meshRef = React.useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        const state = new EntityState();

        state.position = p.position || [0,0,0];
        state.rotation = p.rotation || [0,0,0];
        state.mesh = meshRef.current;
        
        registerComponents(p.children, state, meshRef.current);

        return () => {
            // when done, remove all component state from the system
            unRegisterEntityTree(state);
        }
    }, [meshRef.current]);

    return (
        <mesh ref={meshRef} position={p.position} rotation={p.rotation} >
            {p.children}
        </mesh>
    )
}



// keeping this here for a moment..
function printChildren(children: ReactNode, depth = 0) {
    React.Children.forEach(children, (child) => {
        const typeName = (child as any).type.name || (child as any).type;

        console.log("%c " +"    ".repeat(depth) + "├── " + typeName, 'background: '+['cyan', 'magenta', 'yellow'][depth % 3]+'; color: black');
        if ((child as any).props.children) {
            printChildren((child as any).props.children, depth + 1);
        }
    });
}