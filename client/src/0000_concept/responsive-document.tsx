import { createContext } from "react"

export interface ResponsiveDocumentContext {
    orientation: "portrait" | "landscape";
    wrap: RegExp;

}

function calculateResponsiveDocumentState(): ResponsiveDocumentContext {
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    
    return {
        orientation,
        wrap: new RegExp(`.{${  orientation === "landscape" ? 80 : 25}}`, 'g')
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
 