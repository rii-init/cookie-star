export function wrapText(input: string, orientation: "portrait" | "landscape") {
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


export function calculateResponsiveDocumentState():  "landscape" | "portrait" {
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
}
