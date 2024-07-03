import React from 'react';
import { useEffect } from "react";
import { systems } from "..";
export const XRHardwareState = (p) => {
    useEffect(() => {
        if (!systems.byComponent.UserControls || !p.player)
            return;
        systems.byComponent.UserControls.xr_player = p.player;
    }, [p.player, systems.byComponent.UserControls]);
    return (React.createElement(React.Fragment, null));
};
//# sourceMappingURL=xr-hardware-state.js.map