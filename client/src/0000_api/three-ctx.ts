import { useThree } from "@react-three/fiber";

export interface ThreeCTXProps {
    callback: (ctx: any) => void;
}

export let ThreeJSContext = function(props: ThreeCTXProps) {
    const ctx_three = useThree();
    
    props?.callback(ctx_three);
    
    return null;
}