import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { PixiComponentFactory } from 'src/factories/PixiComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'
import { Promiser } from 'src/utils/Promiser'
import { PixiComponent } from '../base/PixiComponent'
import { LINE_COLOR } from './ZendoStyles'

export const ZendoPart4 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        alpha: 1,
        x: 2200,
        y: 1500,
        width: boardApp.screen.width - 400,
        height: boardApp.screen.height - 100,
        pivotCenter: false
    }

    const chapter = chapters.get(data.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .setOffset(200, 50)
        .build()

    let video: PIXI.Sprite
    const selector = new Selector('What is zen, video')
    selector.activate = async () => {
        const promise = Promiser<void>()
        video = PIXI.Sprite.from('http://localhost:8765/what-is-zen.mp4')
        video.width = cardOptions.width - 10
        video.height = cardOptions.height - 10
        video.x = 5
        video.y = 5

        setTimeout(() => {
            cardData.card.component.addChild(video)
            promise.resolve()
        }, 1000)

        return promise.promise
    }

    selector.deactivate = async () => {
        cardData.card.component.removeChild(video)
        video.texture.baseTexture.destroy()
    }

    const factory = PixiComponentFactory(data.id, chapter.chapterId, cardData)
    factory.appendSelector(selector)
    const previous = components.get(data.previous) as PixiComponent
    factory.mergePixiLine(previous, LINE_COLOR)
    return factory.component
}
