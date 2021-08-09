import * as PIXI from 'pixi.js'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'
import { spaceStyles } from './SpaceStyles'

export const SpacePart1 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x778899,
        alpha: 1,
        x: 800,
        y: 800,
        width: 400,
        height: 390,
        pivotCenter: false
    }

    const header = new PIXI.Text('First in space', spaceStyles.headerStyle())
    header.x = 30
    header.y = 25

    const paragraphText = `On April 12, 1968 aboard the spacecraft Vostok 1, Soviet cosmonaut Yuri Alekseyevich Gagarin became the first human being to travel into space.`
    const paragraph = new PIXI.Text(paragraphText, spaceStyles.paragraphStyle(cardOptions.width - 40))
    paragraph.x = 30
    paragraph.y = 100

    const chapter = chapters.get(data.chapterId)

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(300, 300)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, param)

    return factory.component
}
