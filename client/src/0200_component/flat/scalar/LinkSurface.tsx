import { Html } from "@react-three/drei";
import { useLocation, Link } from "wouter";
import { Universe } from "../../../0000_concept/universe";


export interface LinkSurfaceProps {
    location: string;
    current:  string;
    children: React.ReactNode;
}

export const LinkSurface = (props: LinkSurfaceProps) => {
    const [location, setLocation] = useLocation();

    return (
        <group className="navigation">
            <Html onClick={() => setLocation(props.location)}>
                <a className={ props.current == props.location ? "active" : "" }>
                    {props.children}
                </a>
            </Html>
        </group>
    );
}