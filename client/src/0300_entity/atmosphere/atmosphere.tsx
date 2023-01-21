import { BackSide } from "three"
import { Universe } from "../../0000_concept/universe"
import { themeIdx } from "../../1000_aesthetic/visual-theme.manager"
import { CloudFormation } from "./cloud.formation"
import { Galaxy } from "./galaxy"

export interface AtmosphereProps {
    texture?: string
}

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