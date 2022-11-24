import React from "react";
import { ContentProps } from "./ContentSurface.props";



export function ContentSurface(props?: ContentProps) {

    return (
        <>
            <div className="content-surface">
                { props?.children }
                { props?.text     }
            </div>
        </>
    )

} 