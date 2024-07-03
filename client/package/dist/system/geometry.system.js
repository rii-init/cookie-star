export class GeometrySystem {
    registerComponent(component, state) {
        var _a;
        // take the "args" prop and store it in the state
        const localBoundingBox = [0, 0, 0, 0, 0, 0];
        if (component.props.args) {
            if (component.type) {
                if (component.type == "boxGeometry") {
                    localBoundingBox[0] = -component.props.args[0] / 2;
                    localBoundingBox[1] = -component.props.args[1] / 2;
                    localBoundingBox[2] = -component.props.args[2] / 2;
                    localBoundingBox[3] = component.props.args[0] / 2;
                    localBoundingBox[4] = component.props.args[1] / 2;
                    localBoundingBox[5] = component.props.args[2] / 2;
                }
                else if (component.type == "sphereGeometry") {
                    localBoundingBox[0] = -component.props.args[0];
                    localBoundingBox[1] = -component.props.args[0];
                    localBoundingBox[2] = -component.props.args[0];
                    localBoundingBox[3] = component.props.args[0];
                    localBoundingBox[4] = component.props.args[0];
                    localBoundingBox[5] = component.props.args[0];
                }
            }
        }
        state["geometry"] = {
            type: component.type,
            args: (_a = component === null || component === void 0 ? void 0 : component.props) === null || _a === void 0 ? void 0 : _a.args,
            localBoundingBox,
        };
    }
    removeComponent(component) {
        // noop
    }
    update(delta, context) {
    }
}
//# sourceMappingURL=geometry.system.js.map