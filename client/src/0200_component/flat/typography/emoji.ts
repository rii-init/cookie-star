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


export function createIconCanvas(resolution: [number, number] = [64, 64]) {
    const canvas = document.createElement('canvas');
    canvas.width = resolution[0] * 8;
    canvas.height = resolution[1] * 8;
    const ctx = canvas.getContext('2d');
    if   (ctx) {
          ctx.font = `${resolution[0]}px serif`;
    }
    // draw iconMap 
    iconMap.forEach((row, y) => {
        row.split('').forEach((emoji, x) => {
            if (ctx) {
                ctx.fillText(emoji, x * resolution[0], y * resolution[1]);
            }
        })
    });
    
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