import React from 'react';
import { useXREvent } from "@react-three/xr";
import { systems } from "..";
export const ClimbingControls = (props) => {
    useXREvent('selectstart', (event) => {
        var _a, _b, _c;
        if (!((_a = systems.byComponent.UserControls) === null || _a === void 0 ? void 0 : _a.xrControls))
            return;
        const hand = (_c = (_b = event.target.inputSource) === null || _b === void 0 ? void 0 : _b.handedness) !== null && _c !== void 0 ? _c : 'left';
        const grip = event.target.grip;
        const controllerState = systems.byComponent.UserControls.xrControls.handedness[hand];
        controllerState.selecting = true;
        controllerState.group = grip;
        controllerState.previous.copy(grip.position);
    });
    useXREvent('selectend', (event) => {
        var _a, _b, _c;
        if (!((_a = systems.byComponent.UserControls) === null || _a === void 0 ? void 0 : _a.xrControls))
            return;
        const controllerState = systems.byComponent.UserControls
            .xrControls
            .handedness[(_c = (_b = event.target.inputSource) === null || _b === void 0 ? void 0 : _b.handedness) !== null && _c !== void 0 ? _c : 'left'];
        controllerState.selecting = false;
    });
    return (React.createElement(React.Fragment, null, props.children));
};
//# sourceMappingURL=climbing-controls.js.map