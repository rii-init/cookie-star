export interface Magnet {
    shape: "box" | "sphere";
    dimensions: number[],
    position: [number, number, number],
    rotation?: [number, number, number],
    mobile?: boolean,
}