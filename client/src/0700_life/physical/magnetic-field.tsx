import React, { useContext, useEffect } from "react";

export interface MagneticFieldProps {
    children: React.ReactNode;
    mobile?: boolean
}

export const MagneticField = (p: MagneticFieldProps) => {
    
    useEffect(()=>{
        React.Children.forEach(p.children, element => {
            if (!React.isValidElement(element)) return
          
            const { position, rotation, scale } = element.props
            // get type of element
            React.Children.forEach(element.props.children, child => {
                const { type } = child;
                
                
                if ( child.props.attach=="geometry" ) {
                    
                    if (!p.mobile) {
                        // register geometry with Physical Universe
                        // magnetism.registerMagnet
                    }
                    
    
                }
            })
            
          })    
    }, [])
    
    return (
        <>
            { p.children }
        </>
    )
}