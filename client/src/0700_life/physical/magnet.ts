export interface Magnet {
    shape: "box" | "sphere" | "cylinder";
    dimensions: number[],
    position: [number, number, number],
    rotation?: [number, number, number],
    mobile?: boolean,
}
