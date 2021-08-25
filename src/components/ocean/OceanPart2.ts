import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { PixiComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { PixiComponent } from '../base/FlowComponent'
import { oceanStyles } from './OceanStyles'

export const OceanPart2 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        alpha: 1,
        x: 1500,
        y: 600,
        width: 450,
        height: 220,
        pivotCenter: false
    }

    const headerStyle = new PIXI.TextStyle({
        fontSize: 35,
        fontWeight: 'bold',
        fill: ['#44aaff'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    })

    const header = new PIXI.Text('The Ancient life', headerStyle)
    header.x = 30
    header.y = 30

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 25,
        fill: ['#FFFFFF'], // gradient
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: cardOptions.width - 40,
        lineJoin: 'round'
    })

    const paragraphText = 'Which lasted from 541 until 252 million years ago,' + ' was a time of great change on Earth.'

    const paragraph = new PIXI.Text(paragraphText, paragraghStyle)
    paragraph.x = 30
    paragraph.y = 80

    const previous = components.get(data.previous) as PixiComponent

    const chapter = chapters.get(data.chapterId)

    const pixiParams = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(400, 300)
        .build()

    const factory = PixiComponentFactory(data.id, chapter.chapterId, pixiParams)
    factory.mergePixiLine(previous, oceanStyles.LINE_COLOR)
    return factory.component
}
