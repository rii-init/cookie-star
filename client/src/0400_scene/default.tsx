import { useLocation } from "wouter";
import { Evaluator } from "../0100_content/evaluator";
import { useEffect } from "react";

export const DefaultScene = () => {
    const [location, setLocation] = useLocation();
    
    return (
        <group>
            <Evaluator location={location}></Evaluator>
        </group>
    );
}