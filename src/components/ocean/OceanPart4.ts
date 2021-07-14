import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'
import { oceanStyles } from './OceanStyles'

export const OceanPart4 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        x: 800,
        y: 1300,
        width: 400,
        height: 150,
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

    const header = new PIXI.Text('Life in the ocean', headerStyle)
    header.x = 20
    header.y = 20

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 22,
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

    const paragraphText = 'The oceans harbor 99% of all living space on Earth'
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle)
    paragraph.x = 20
    paragraph.y = 65

    const chapter = chapters.get(data.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(600, 150)
        .build()

    const previous = components.get(data.previous)
    const factory = FlowComponentFactory(data.id, chapter.chapterId, cardData)
    factory.mergePixiLine(previous, oceanStyles.LINE_COLOR)

    return factory.component
}
