import { Children, useContext } from "react";
import { ResponsiveDocumentContext } from "../../../0000_concept/responsive-document";

export const TextWrap = (props: {
        children: React.ReactNode, // Content
        renderer: (text: string) => React.ReactNode
    }) => {


    const doc  = useContext(ResponsiveDocumentContext);
	const wrap = new RegExp(`.{${doc.orientation === "landscape" ? 80 : 25}}/g`); 

    return (
        <>
        {
            Children.toArray(props.children).flatMap((child) => {
                
                if (typeof child === "string") {

                    return child.match(wrap)?.map((line, i) => {
                        return props.renderer(line);
                    })
                        
                }	

                return child;
            })
        }
        </>
    );
}