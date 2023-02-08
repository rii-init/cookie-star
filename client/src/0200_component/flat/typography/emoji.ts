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

export const getIconCoords = (emoji: string, res = 64) => {

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