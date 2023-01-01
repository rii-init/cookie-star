import React from "react";
import { Flat } from "../../../100_element/flat/[flat]";
import { ContentProps } from "./ContentSurface.props";



export function ContentSurface(props?: ContentProps) {

    return (
        <Flat>
            <div className="content-surface">
                { props?.children }
                { props?.text     }
            </div>
        </Flat>
    )

} 