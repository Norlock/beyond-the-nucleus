import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { PixiComponentFactory } from 'src/factories/PixiComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { PixiComponent } from '../base/PixiComponent'
import { oceanStyles } from './OceanStyles'

export const OceanPart5 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        x: 1700,
        y: 700,
        width: 500,
        height: 200,
        pivotCenter: false
    }

    const headerStyle = new PIXI.TextStyle({
        fontSize: 30,
        fill: ['#44aaff'],
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    })

    const header = new PIXI.Text('Photic zone', headerStyle)
    header.x = 20
    header.y = 20

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 22,
        fill: ['#FFFFFF'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: cardOptions.width - 40,
        lineJoin: 'round'
    })

    const paragraphText =
        'In the photic zone, the photosynthesis rate exceeds the respiration rate. This is due to the abundant solar energy.'
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle)
    paragraph.x = 20
    paragraph.y = 65

    const chapter = chapters.get(data.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(600, 200)
        .build()

    const previous = components.get(data.previous)
    const factory = PixiComponentFactory(data.id, chapter.chapterId, cardData)
    factory.mergePixiLine(previous, oceanStyles.LINE_COLOR)
    return factory.component
}
