import * as PIXI from 'pixi.js'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'

export const OceanPart6 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        alpha: 1,
        x: 100,
        y: 100,
        width: 530,
        height: 180,
        pivotCenter: false
    }

    const headerStyle = new PIXI.TextStyle({
        fontSize: 33,
        fontStyle: 'bold',
        fill: ['#44aaff'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    })

    const header = new PIXI.Text('The Rainforests of the Sea', headerStyle)
    header.x = cardOptions.width / 2
    header.y = 40
    header.anchor.set(0.5)

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

    const paragraphText = 'Coral reefs are the largest structures on earth of biological origin.'
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle)
    paragraph.x = 20
    paragraph.y = 75

    const chapter = chapters.get(data.container.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.container.name)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(100, 100)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, cardData)
    return factory.component
}
