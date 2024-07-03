import React from 'react';
import { useEffect } from "react";

import { Group } from "three";
import { systems } from "..";

export const XRHardwareState = (p: { player: Group }) => {

    useEffect(() => {
        if (!systems.byComponent.UserControls || !p.player) return;

        systems.byComponent.UserControls.xr_player = p.player;
    }, [p.player, systems.byComponent.UserControls])

    return (
        <>
        </>
    );
}