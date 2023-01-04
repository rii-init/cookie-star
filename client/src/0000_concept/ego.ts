import { Living } from "../0700_life/living";

export interface Ego {
    register: (one: Living<Ego>) => void;
}