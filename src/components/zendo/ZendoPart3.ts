import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { PixiComponentFactory } from 'src/factories/PixiComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { PixiComponent } from '../base/PixiComponent'
import { LINE_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles'

export const ZendoPart3 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 800,
        y: 900,
        width: 500,
        height: 250,
        pivotCenter: false
    }

    const header = new PIXI.Text('A great Indian sage', headerStyle())
    header.x = cardOptions.width / 2
    header.y = 50
    header.anchor.set(0.5)

    const paragraphText = 'Once said'
    const parStyle = paragraphStyle(cardOptions.width - 40)
    parStyle.dropShadow = false
    parStyle.fill = ['#000']
    parStyle.fontSize = 28
    parStyle.strokeThickness = 1.5
    const paragraph = new PIXI.Text(paragraphText, parStyle)
    paragraph.x = 20
    paragraph.y = 80

    const quoteText = 'The world is illusion. Only True Self is real. The world is True Self.'
    const quote = new PIXI.Text(quoteText, paragraphStyle(cardOptions.width - 40))
    quote.x = 20
    quote.y = 120

    const chapter = chapters.get(data.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setImageCard(zendoCardImage(cardOptions.width, cardOptions.height))
        .addChild(header, paragraph, quote)
        .setOffset(300, 200)
        .elevate(12)
        .build()

    const factory = PixiComponentFactory(data.id, chapter.chapterId, cardData)
    const previous = components.get(data.previous) as PixiComponent
    factory.mergePixiLine(previous, LINE_COLOR)
    return factory.component
}
