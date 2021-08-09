import * as PIXI from 'pixi.js'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'

export const OceanPart1 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        alpha: 1,
        x: 200,
        y: 200,
        width: 400,
        height: 190,
        pivotCenter: false
    }

    const headerStyle = new PIXI.TextStyle({
        fontSize: 35,
        fontWeight: 'bold',
        fill: ['#44aaee'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    })

    const header = new PIXI.Text('The Ocean', headerStyle)
    header.x = 30
    header.y = 25

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 25,
        fill: ['#FFFFFF'], // gradient
        wordWrap: true,
        wordWrapWidth: cardOptions.width - 40,
        lineJoin: 'round'
    })

    const paragraphText = 'All live came from the ocean around 3.5 billion years ago.'
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle)
    paragraph.x = 30
    paragraph.y = 80

    const chapter = chapters.get(data.chapterId)

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(200, 200)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, param)

    return factory.component
}
