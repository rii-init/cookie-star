import { nextTick } from "process";
import { MagnetSystem } from "./magnet.system";

export const System = {
  "magnetClient": null as any,
  "magnetServer": null as any,  
}

export function initSystems() {
    const magnetSystem = new MagnetSystem();

    System.magnetClient = magnetSystem;
    System.magnetServer = magnetSystem;
    return System;
}