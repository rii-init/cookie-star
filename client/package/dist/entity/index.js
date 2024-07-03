import React, { useEffect } from "react";
import { Children } from "react";
import { SystemEntityState, systems } from "../system";
// 
function registerComponents(childrenOfMesh, state, parentMesh) {
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
            subEntityState.position = component.props.position || [0, 0, 0];
            subEntityState.rotation = component.props.rotation || [0, 0, 0];
            const subMesh = parentMesh === null || parentMesh === void 0 ? void 0 : parentMesh.children[index];
            subEntityState.mesh = subMesh;
            registerComponents(component.props.children, subEntityState, subMesh);
        }
        else {
            const type = (component.type.typeName || component.type);
            if (typeof type === "string") {
                // check if there's an associated system for this component
                if (systems.byComponent[type]) {
                    // if so, register the component with the system
                    systems.byComponent[type]
                        .registerComponent(component, state, parentMesh);
                }
            }
        }
        return component;
    });
}
function unRegisterEntityTree(state) {
    // unregister components at this entity node
    for (const systemName in state.systemEntityState) {
        if (state.systemEntityState[systemName]) {
            state.systemEntityState[systemName].remove();
        }
    }
    // unregister components at child entity nodes
    for (const subEntityState of state.subEntityState) {
        unRegisterEntityTree(subEntityState);
    }
}
export class EntityState {
    constructor() {
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.subEntityState = [];
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.systemEntityState = new SystemEntityState();
    }
}
export const Entity = (p) => {
    const meshRef = React.useRef(null);
    useEffect(() => {
        if (!meshRef.current)
            return;
        const state = new EntityState();
        state.position = p.position || [0, 0, 0];
        state.rotation = p.rotation || [0, 0, 0];
        state.mesh = meshRef.current;
        registerComponents(p.children, state, meshRef.current);
        return () => {
            // when done, remove all component state from the system
            unRegisterEntityTree(state);
        };
    }, [meshRef.current]);
    return (React.createElement("mesh", { ref: meshRef, position: p.position, rotation: p.rotation }, p.children));
};
// keeping this here for a moment..
function printChildren(children, depth = 0) {
    React.Children.forEach(children, (child) => {
        const typeName = child.type.name || child.type;
        console.log("%c " + "    ".repeat(depth) + "├── " + typeName, 'background: ' + ['cyan', 'magenta', 'yellow'][depth % 3] + '; color: black');
        if (child.props.children) {
            printChildren(child.props.children, depth + 1);
        }
    });
}
//# sourceMappingURL=index.js.map