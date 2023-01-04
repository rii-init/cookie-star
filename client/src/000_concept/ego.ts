import { Living } from "../700_life/living";

export interface Ego {
    register: (one: Living<Ego>) => void;
}