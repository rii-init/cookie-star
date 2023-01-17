export interface Magnet {
    shape: "box" | "sphere";
    proportions: number[],
    position: [number, number, number],
    rotation?: [number, number, number],
    mobile?: boolean,
}