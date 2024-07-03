import { named } from "../etc/0000_concept/named";
export const Editable = named(function () { return null; }, "Editable");
export class EditableSystem {
    registerComponent(component, state) {
        // this has to wrap the parent of component with <RayGrab> and i'm not sure that's possible
        // I'm not sure how to do this imperatively from this function, is more specifically the issue
    }
    removeComponent(component) {
    }
    update(delta, context) {
    }
}
//# sourceMappingURL=editable.system.js.map