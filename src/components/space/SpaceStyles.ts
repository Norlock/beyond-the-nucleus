import * as PIXI from 'pixi.js'

const paragraphStyle = (wordWrapWidth: number): PIXI.TextStyle => {
    return new PIXI.TextStyle({
        fontSize: 25,
        fontFamily: 'Monaco',
        fill: '#73a596',
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
        fill: '#AEB8C2',
        align: 'center',
        lineJoin: 'round'
    })
}

//const BORDER_COLOR = 0xa2adb9
const BORDER_COLOR = 0xaeb8c2
const LINE_COLOR = 0x000000

export const spaceStyles = {
    paragraphStyle,
    headerStyle,
    LINE_COLOR,
    BORDER_COLOR
}
