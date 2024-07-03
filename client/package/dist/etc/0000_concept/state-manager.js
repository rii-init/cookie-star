import { BehaviorSubject, Subject } from "rxjs";
import { calculateResponsiveDocumentState } from "./responsive-document";
export const stateManager = {
    cursor: {
        $activation: new BehaviorSubject(0.25),
        $parent: new BehaviorSubject(null),
    },
    scrolling: {
        $distance: new BehaviorSubject(0),
        $scrollDomain: new BehaviorSubject(1),
        $position: new BehaviorSubject([0, 0, 0]),
        $parent: new BehaviorSubject(null),
    },
    resizing: {
        $resize: new Subject(),
    },
    responsiveDocument: {
        $orientation: new BehaviorSubject(calculateResponsiveDocumentState()),
    }
};
//# sourceMappingURL=state-manager.js.map