export function htmlNodeFilter(node: ChildNode) {
    return  (
                    node instanceof HTMLElement && 
                    !(    
                        node.nodeName           === "SCRIPT" ||
                        node.getAttribute("id") === "root" 
                     )
            )
            ||
            (
                                  node.nodeName === "#text" && 
                !/^[\n\s]+$/.test(node.textContent || "")
            )
}