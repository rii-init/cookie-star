import { Universe } from "../0000_concept/universe";
import { SpaceConfig } from "./parser";

export class RunCommands {
    public static invoke(config: SpaceConfig) {
        if (config.call !== undefined && config.call.length > 0) {
            config.call.forEach((call) => {
                switch (call[0]) {
                    case "Universe.user_controls.track.setCameraPosesToDefault":
                        Universe.user_controls.track.setCameraPosesToDefault();
                    break;
                    case "Universe.user_controls.track.setCameraPoses":
                        Universe.user_controls.track.setCameraPoses(call[1]);
                    break;
    
                    default:
                        // No-op
                }
            });
        }
    }
}