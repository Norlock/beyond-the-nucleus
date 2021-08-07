import * as PIXI from 'pixi.js'

const paragraphStyle = (wordWrapWidth: number): PIXI.TextStyle => {
    return new PIXI.TextStyle({
        fontSize: 25,
        fontFamily: 'Monaco',
        fill: ['#8fafcf'],
        dropShadow: true,
        wordWrap: true,
        wordWrapWidth
    })
}

const headerStyle = (): PIXI.TextStyle => {
    return new PIXI.TextStyle({
        fontSize: 35,
        //fontStyle: "bold",
        fontFamily: 'Monaco',
        fill: ['#eeeeff'],
        align: 'center',
        lineJoin: 'round'
    })
}

const LINE_COLOR = 0x000000

export const spaceStyles = {
    paragraphStyle,
    headerStyle,
    LINE_COLOR
}
