import { BloomFilter } from 'pixi-filters'
import * as PIXI from 'pixi.js'
import { boardApp } from 'src/pixi/PixiApp'

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

const filters = [new BloomFilter(1, 5, boardApp.renderer.resolution, 9)]

export const spaceStyles = {
    paragraphStyle,
    headerStyle,
    LINE_COLOR,
    BORDER_COLOR,
    filters
}
