export function getRGB (hexColor: string): [number, number, number] {
    return  (
        hexColor.split("")
                .slice(1 )
                .join("" )
                .match(/[0-9a-f]{2}/g) || []
    )            
    .map((v: string) => parseInt(v, 16) / 255) as [number, number, number]
}