import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'
import { LINE_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles'

export const ZendoPart2 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 1400,
        y: 200,
        width: 400,
        height: 200,
        pivotCenter: false
    }

    const header = new PIXI.Text('Zendō', headerStyle())
    header.x = cardOptions.width / 2
    header.y = 40
    header.anchor.set(0.5)

    const paragraphText = 'Is a Japanese meditation hall where zazen is practiced'
    const paragraph = new PIXI.Text(paragraphText, paragraphStyle(cardOptions.width - 40))
    paragraph.x = 20
    paragraph.y = 75

    const chapter = chapters.get(data.container.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.container.name)
        .setImageCard(zendoCardImage(400, 180))
        .addChild(header, paragraph)
        .setOffset(300, 200)
        .elevate(12)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, cardData)
    factory.mergePixiLine(components.get(data.previous), LINE_COLOR)
    return factory.component
}
