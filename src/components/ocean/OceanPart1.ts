import * as PIXI from 'pixi.js'
import { ChapterType } from 'src/chapters/base/ChapterType'
import { OceanName } from 'src/chapters/OceanChapter'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PartChainFactory } from 'src/factories/PartChainFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { LoaderType } from 'src/modules/partChain/PartLoader'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'
import { PartChain } from '../base/PartChain'
import { defaultTestFlags, TestFlags } from '../base/PartTester'
import { OceanPart2 } from './OceanPart2'

export const OceanPart1 = (): PartChain => {
    return PartChainFactory('Ocean1', ChapterType.OCEAN, undefined)
        .mergeLoader(LoaderType.FLOW, component, undefined)
        .setTestFlags(testFlags())
        .setNextParts(OceanPart2)
        .build()
}

const testFlags = (): TestFlags => {
    const standard = defaultTestFlags()
    standard.hasPrevious = false
    standard.hasLine = false
    return standard
}

const component = (factory: FlowComponentFactory): FlowComponent => {
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
        fontStyle: 'bold',
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

    const { component } = factory
    const param = PixiCardFactory(cardOptions, component.chapter, OceanName.START)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(200, 200)
        .build()

    factory.mergePixiCard(param.containerName, param.card)
    return factory.component
}
