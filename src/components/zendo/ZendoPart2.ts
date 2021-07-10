import * as PIXI from 'pixi.js'
import { ChapterType } from 'src/chapters/base/ChapterType'
import { ZendoName } from 'src/chapters/ZendoChapter'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PartChainFactory } from 'src/factories/PartChainFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { LoaderType } from 'src/modules/partChain/PartLoader'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'
import { PartChain } from '../base/PartChain'
import { defaultTestFlags } from '../base/PartTester'
import { ZendoPart3 } from './ZendoPart3'
import { LINE_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles'

export const ZendoPart2 = (previous: PartChain): PartChain => {
    return PartChainFactory('Zendo2', ChapterType.ZEN, previous)
        .mergeLoader(LoaderType.FLOW, component, attachPreviousComponent)
        .setTestFlags(defaultTestFlags())
        .setNextParts(ZendoPart3)
        .build()
}

const attachPreviousComponent = (factory: FlowComponentFactory, previous: FlowComponent): void => {
    factory.mergePixiLine(previous, LINE_COLOR)
}

const component = (factory: FlowComponentFactory): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 1400,
        y: 200,
        width: 400,
        height: 180,
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

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, ZendoName.START)
        .setImageCard(zendoCardImage(400, 180))
        .addChild(header, paragraph)
        .setOffset(300, 200)
        .elevate(12)
        .build()

    return factory.mergePixiCard(cardData.containerName, cardData.card).component
}
