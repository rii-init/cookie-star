import { calculateBufferedItemVisibility } from "./sequence";
export {};

describe("Sequence", () =>  {

    it("should cull visibility based on ocluisive range, relative to camera's scrolling position", () => {

        const items = [
            {
              position: { x: 0, y: 0, z: 1 },
              visible: true
            },
            {
                position: { x: 0, y: 0, z: 3 },
                visible: true
            },
            {
                position: { x: 0, y: 0, z: 5 },
                visible: true
            },
            {
                position: { x: 0, y: 0, z: 7 },
                visible: true
            },
        ]

        const bufferSize        = 2;
        const sequencePosition  = [2, 0, 1] as [number, number, number];
        const sequenceDirection = "z"
        

        const scrollDistance = 2;


        items.forEach((item, index) => {
            const itemPosition = item.position[sequenceDirection];
            const visible = calculateBufferedItemVisibility(sequenceDirection, sequencePosition, bufferSize, itemPosition, 1, scrollDistance);
            expect(visible).toBe(index >= 1 && index <= 3);
        });

    })

})