import * as PIXI from 'pixi.js'
import { chapters, components, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Dimensions, imageFrame } from 'src/modules/pixi/PixiShapes'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'
import { Promiser } from 'src/utils/Promiser'
import { FlowComponent } from '../base/FlowComponent'
import { LINE_COLOR, headerStyle, zendoCardImage } from './ZendoStyles'

export const ZendoPart5 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 3200,
        y: 400,
        width: 400,
        height: 250,
        pivotCenter: false
    }

    const hdStyle = headerStyle()
    hdStyle.fontSize = 42
    hdStyle.fill = '#999'
    const header = new PIXI.Text('Zazen', hdStyle)
    header.x = cardOptions.width / 2
    header.y = 50
    header.anchor.set(0.5)

    const paragraphText = 'Also known as sitting meditation.'
    const paragraphStyle = new PIXI.TextStyle({
        fontSize: 32,
        fontFamily: 'Monaco',
        fill: '#DDD',
        stroke: '#000',
        strokeThickness: 1,
        dropShadow: true,
        dropShadowColor: '#000',
        dropShadowDistance: 2,
        dropShadowBlur: 2,
        letterSpacing: 1.5,
        wordWrap: true,
        wordWrapWidth: 250
    })

    const paragraph = new PIXI.Text(paragraphText, paragraphStyle)
    paragraph.x = 30
    paragraph.y = 90

    const chapter = chapters.get(data.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setImageCard(zendoCardImage(cardOptions.width, cardOptions.height))
        .addChild(header, paragraph, logo())
        .setOffset(150, 150)
        .elevate(12)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, cardData)
    const component = factory.component

    component.selector.append(selector(component))

    factory.mergePixiLine(components.get(data.previous), LINE_COLOR)
    return component
}

const logo = (): PIXI.Container => {
    const buddhaLogo = PIXI.Sprite.from('src/assets/zendo/Buddha-logo.png')
    buddhaLogo.x = 250
    buddhaLogo.y = 72
    buddhaLogo.width = 125
    buddhaLogo.height = 150

    const filter = new PIXI.filters.ColorMatrixFilter()
    filter.negative(true)

    const filter2 = new PIXI.filters.ColorMatrixFilter()
    const filter3 = new PIXI.filters.NoiseFilter()

    filter3.noise = 0.6
    filter2.brightness(0.1, true)

    buddhaLogo.filters = [filter, filter3, filter2]

    const container = new PIXI.Container()
    container.addChild(buddhaLogo)
    return container
}

const selector = (component: FlowComponent): Selector => {
    const { root } = chapters.get(component.chapterId)
    const { card } = component

    const zazenDimensions: Dimensions = {
        width: 400,
        height: 532,
        x: card.x + card.width + 200,
        y: card.y - 100
    }

    const colorFilter = new PIXI.filters.ColorMatrixFilter()
    colorFilter.greyscale(0.3, true)

    const bonsaiDimensions: Dimensions = {
        width: 400,
        height: 532,
        x: zazenDimensions.x + zazenDimensions.width + 200,
        y: zazenDimensions.y
    }

    let zazenFrame: PIXI.Sprite
    let bonsaiFrame: PIXI.Sprite

    const selector = new Selector('Zazen image part 5')
    selector.activate = async (): Promise<void> => {
        const promise = Promiser<void>()
        zazenFrame = imageFrame('src/assets/zendo/zazen.jpg', zazenDimensions, 5)
        bonsaiFrame = imageFrame('src/assets/zendo/bonsai.jpg', bonsaiDimensions, 5, [colorFilter])

        root.addChild(zazenFrame)
        root.addChild(bonsaiFrame)

        const show = (delta: number): void => {
            bonsaiFrame.alpha = zazenFrame.alpha += 0.01 * delta

            if (zazenFrame.alpha >= 1) {
                boardApp.ticker.remove(show)
                promise.resolve()
            }
        }

        bonsaiFrame.alpha = zazenFrame.alpha = 0
        setTimeout(() => boardApp.ticker.add(show), 1000)
        return promise.promise
    }

    selector.deactivate = async (): Promise<void> => {
        bonsaiFrame.alpha = zazenFrame.alpha = 0
        root.removeChild(zazenFrame, bonsaiFrame)
    }

    return selector
}
