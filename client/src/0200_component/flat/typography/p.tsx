import { Text } from "@react-three/drei";

export interface TextPProps {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextP = (p: TextPProps) => {
    if (!(typeof p.children === "string")) {
        throw new Error("TextP: props.children must be a string");
    }
    const paragraph = (p.children as string)
             .match(/(.{1,32})(?:\s|$)/g);;

    return (
        paragraph?.map(lineContent => (
            <Text
                scale={[0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1)]}
                color={p.color || "black"} // default
                anchorX="center" // default
                anchorY="middle" // default
            >
                { lineContent }   
            </Text>
        ))
    );
}