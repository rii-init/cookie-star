export function wrapText(input, orientation) {
    const margin = orientation === "landscape" ? 80 : 36;
    if (input.length <= margin) {
        return [input];
    }
    const tokens = input.split(" ");
    const lines = [];
    let line = "";
    for (let i = 0; i < tokens.length; i++) {
        line += tokens[i] + " ";
        if (i == tokens.length - 1 || line.length >= margin) {
            lines.push(line);
            line = "";
        }
    }
    return lines;
}
export function calculateResponsiveDocumentState() {
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
}
//# sourceMappingURL=responsive-document.js.map