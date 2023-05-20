import { Html } from "@react-three/drei";
import { useLocation, Link } from "wouter";
import { Sequence } from "../../../0100_element/200_sequence/sequence";
import { LinkSurface } from "../scalar/LinkSurface";

export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
    const offset = [0,-0.1, 0.4] as [number, number, number];

    return (
      <group className="navigation">

        <Sequence direction="x" polarity={1} position={[-1.32,1.6,-1]} color={[250,250,250]} itemPadding={-0.333}>
		      <LinkSurface location="/"     current={location} position={offset}>{ location=="/" ? "./" : "../" }</LinkSurface>
          <LinkSurface location="/cv"   current={location} position={offset}>CV</LinkSurface>
          <LinkSurface location="/tech" current={location} position={offset}>Tech</LinkSurface>
          <LinkSurface location="/chat" current={location} position={offset}>Chat</LinkSurface>
          <LinkSurface location="/meta" current={location} position={offset}>Meta</LinkSurface>
        </Sequence>

      </group>
    );
  };
