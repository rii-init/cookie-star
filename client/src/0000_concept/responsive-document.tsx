import { createContext } from "react"

export interface ResponsiveDocumentContext {
    orientation: "portrait" | "landscape";
    splitLineAtNCharacters: number;

}

function calculateResponsiveDocumentState(): ResponsiveDocumentContext {
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    
    return {
        orientation,
        splitLineAtNCharacters: orientation === "landscape" ? 80 : 25,
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
 