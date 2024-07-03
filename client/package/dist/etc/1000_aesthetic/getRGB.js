export function getRGB(hexColor) {
    return (hexColor.split("")
        .slice(1)
        .join("")
        .match(/[0-9a-f]{2}/g) || [])
        .map((v) => parseInt(v, 16) / 255);
}
//# sourceMappingURL=getRGB.js.map