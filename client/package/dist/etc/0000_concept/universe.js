import { currentTheme } from "../1000_aesthetic/visual-theme.manager";
import { stateManager } from "./state-manager";
/***    ⭐       🪐✨
 * 🌟    ✨⭐
 *  Universe  OwO  <3
 *⭐        🌟🧋
 */
export class Universe {
}
Universe.xrMode = false;
Universe.state = stateManager;
Universe.colors = currentTheme();
// refactor this into a SkySystem
Universe.skyColor = Universe.colors.background;
Universe.skyColor2 = Universe.colors.background2;
Universe.sky = null;
//# sourceMappingURL=universe.js.map