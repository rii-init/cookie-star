import { useLocation, Link } from "wouter";
import { Sequence } from "../../../0100_element/200_sequence/sequence";
import { LinkSurface } from "../scalar/LinkSurface";
import { diagnosticState } from "../../../0000/r3f-debug";
import { useEffect } from "react";

export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
    const offset = [0,-0.1, 0.4] as [number, number, number],
          linkPosition = [0,0,0] as [number, number, number];

    return (
      <group className="navigation">

        <Sequence direction="x" polarity={1} position={[-1.32,1.6,-1]} color={[250,250,250]} itemPadding={-0.333}>
		      <LinkSurface location="/"     current={location} position={offset} linkPosition={linkPosition}>{ location=="/" ? "./" : "../" }</LinkSurface>
          <LinkSurface location="/cv"   current={location} position={offset} linkPosition={linkPosition}>CV</LinkSurface>
          <LinkSurface location="/tech" current={location} position={offset} linkPosition={linkPosition}>Tech</LinkSurface>
          <LinkSurface location="/chat" current={location} position={offset} linkPosition={linkPosition}>Chat</LinkSurface>
          <LinkSurface location="/meta" current={location} position={offset} linkPosition={linkPosition}>Meta</LinkSurface>
        </Sequence>

      </group>
    );
  };
