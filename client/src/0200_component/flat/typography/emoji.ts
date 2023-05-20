import { DoubleSide, MeshBasicMaterial, NearestFilter } from "three";

const iconMap = [
    '🌕🌖🌗🌘🌑🌒🌓🌔',
    '🌝🌛✨🌟⭐️🪐🌏🌠',
    '🍎🍐🍊🍋🍌🍉🍇🍓',
    '🐶🐱🦊🐹🐰🐭🦝🐼',
    '😺😸😹😻😼😽🙀😾',
    '😿🐱🐈😼😾😿  ',
    '🛩️🚁🛸🚀🚗🚕🚙 ',
    '💾💿📀📁📂🗂️  ',
]

const initialisationMap = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
];

export function getOrRenderEmojiTextureWithUVsForGlyph(
        glyph: string, 
        resolution: [number, number] = [1024, 1024],
        glyph_size: [number, number] = [128, 128],
) {
    const { x, y } = getIconCoords(glyph);
    const uv = [
        x                   / resolution[0], y                   / resolution[1],
        (x + glyph_size[0]) / resolution[0], y                   / resolution[1],
        (x + glyph_size[0]) / resolution[0], (y + glyph_size[1]) / resolution[1],
        x                   / resolution[0], (y + glyph_size[1]) / resolution[1],
    ];
    return {
        texture: null, // getOrRenderEmojiTexture(),
        uv,
    }
}
/**
function getOrRenderEmojiAsMaterial(uvs: number[]) {
    const texture = getOrRenderEmojiTexture();
    const material = new MeshBasicMaterial({
        map: texture,
        transparent: true,
        // NearestFilter,
        side: DoubleSide,
    });
    material.map.offset.set(uvs[0], uvs[1]);
    material.map.repeat.set(uvs[2] - uvs[0], uvs[3] - uvs[1]);
    return material;
} */

let emojiTexture: THREE.Texture | undefined;

export function createIconCanvas(resolution: [number, number] = [64, 64]) {
    const canvas = document.createElement('canvas');
    canvas.width = resolution[0] * 8;
    canvas.height = resolution[1] * 8;
    
    return canvas;
}




export function getIconCoords(emoji: string, res = 64) {

    const yCoordinate = iconMap.indexOf(
            iconMap.filter(
                (row) => row.indexOf(emoji) > -1
            )
            [0]
    );

    const xCoordinate = iconMap[yCoordinate]
                        .indexOf(emoji);

    return {
        x: xCoordinate * res,
        y: yCoordinate * res,
    }
}