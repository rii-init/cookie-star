import { BackSide } from "three"
import { Universe } from "../../0000_concept/universe"
import { themeIdx } from "../../1000_aesthetic/visual-theme.manager"
import { CloudFormation } from "./cloud.formation"
import { Galaxy } from "./galaxy"
import { ShaderMaterial } from "three";

export interface AtmosphereProps {
    texture?: string
}

/* glsl */
const sky = `
#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform vec2 resolution;

void main( void ) {

	vec2 position = ( gl_FragCoord.xy / resolution.xy );

	float color = 0.532; 
	
	if (position.y < 0.8 && position.y > 0.2) {
		color = 1.0-(1.54*abs(position.y-0.5));
	}

	gl_FragColor = vec4( vec3( color*0.9, color*1.2, 1.0), 1.0 );

}
`;

export const Atmosphere = (props: AtmosphereProps) => {
    return (
        <group>
            
            { themeIdx == 1 
                ? (
                    <Galaxy />
                  )
                : null
            }
            <CloudFormation />
        </group>
    )
}