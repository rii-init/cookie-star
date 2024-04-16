import { systems } from "../0700_life/system";
import { SpaceConfig } from "./parser";

export class RunCommands {
    public static invoke(config: SpaceConfig) {
        if (config.call !== undefined && config.call.length > 0) {
            config.call.forEach((call) => {
                switch (call[0]) {
                    case "systems.byComponent.UserControls.track.setCameraPosesToDefault":
                        systems.byComponent.UserControls?.track.setCameraPosesToDefault();
                    break;
                    case "systems.byComponent.UserControls.track.setCameraPoses":
                        systems.byComponent.UserControls?.track.setCameraPoses(call[1]);
                    break;
    
                    default:
                        // No-op
                }
            });
        }
    }
}