import { createContext } from "react"
import { diagnosticState } from "../0000/r3f-debug";

export interface ResponsiveDocumentContext {
    orientation: "portrait" | "landscape";
    wrap: (input: string) => string[];

}


function wrapText(input: string, orientation: "portrait" | "landscape") {
    const margin = orientation === "landscape" ? 80 : 36;

    if (input.length <= margin) {
        return [input];
    }
    
    const tokens = input.split(" ");
    const lines = [] as string[];
    let line = "";

    for (let i = 0; i < tokens.length; i++) {

        line += tokens[i] + " ";

        if (i == tokens.length -1 || line.length >= margin) {
            lines.push(line);
            line = "";
        }
        
    }
    
    return lines;
}


function calculateResponsiveDocumentState(): ResponsiveDocumentContext {
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    
    return {
        orientation,
        wrap: (input: string) => wrapText(input, orientation)
    }
}

       const responsiveDocState = calculateResponsiveDocumentState();
export const ResponsiveDocumentContext = createContext(responsiveDocState)


export const ResponsiveDocument = (p: {children: React.ReactNode}) => {
        
        return (
            <ResponsiveDocumentContext.Provider value={responsiveDocState}>
                { p.children }
            </ResponsiveDocumentContext.Provider>
        )
}
 