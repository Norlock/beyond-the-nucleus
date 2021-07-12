import * as PIXI from 'pixi.js'
import { ZendoName } from 'src/chapters/ZendoChapter'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { CustomPixiCardFactory } from 'src/factories/CustomPixiCardFactory'
import { boardApp } from 'src/pixi/PixiApp'
import { FlowComponent } from '../base/FlowComponent'
import { ChapterType } from 'src/chapters/base/ChapterType'
import { chapters, ElmComponent } from 'src/elm-bridge'

export const ZendoPart1 = (data: ElmComponent): FlowComponent => {
    const chapter = chapters.get(data.chapterId)
    const background = chapter.find(ZendoName.START)
    const left = background.getChildAt(0) as PIXI.Sprite

    const radius = 288
    const blurSize = 25

    const container = new PIXI.Container()
    container.x = left.width + 25 - radius
    container.y = left.height / 2 - radius

    const outerCircle = new PIXI.Graphics()
        .lineStyle(2, 0xb00023, 1)
        .beginFill(0x000000)
        .drawCircle(radius + blurSize, radius + blurSize, radius + blurSize)
        .endFill()

    outerCircle.filters = [new PIXI.filters.BlurFilter(blurSize)]

    const circle = new PIXI.Graphics()
        .lineStyle(2, 0xb00023, 1)
        .beginFill(0x000000)
        .drawCircle(radius, radius, radius)
        .endFill()

    circle.x = circle.y = blurSize

    container.addChild(outerCircle, circle)

    const headerStyle = new PIXI.TextStyle({
        fontSize: 72,
        fill: ['#765432'],
        fontFamily: 'Monaco',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: radius,
        lineJoin: 'round'
    })

    const header = new PIXI.Text('Zendo', headerStyle)
    header.x = radius
    header.y = 135
    header.anchor.set(0.5, 0)

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 36,
        fill: ['#FFEFCF'],
        fontFamily: 'Monaco',
        wordWrap: true,
        wordWrapWidth: radius * 2 - 100,
        lineJoin: 'round'
    })

    const paragraphText = '"Do not look for a sanctuary in anyone except your self."'
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle)
    paragraph.x = 80
    paragraph.y = radius - 30

    const paragraphText2 = '- Buddha'
    const paragraph2 = new PIXI.Text(paragraphText2, paragraghStyle)
    paragraph2.x = radius
    paragraph2.y = radius + 80
    paragraph2.anchor.set(0.5, 0)

    const cardData = CustomPixiCardFactory(background, ZendoName.START)
        .setCard(container)
        .addChild(header, paragraph, paragraph2)
        .setOffset(boardApp.screen.width / 2 - radius, boardApp.screen.height / 2 - radius)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, cardData)
    return factory.component
}
