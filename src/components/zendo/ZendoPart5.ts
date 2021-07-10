//import * as PIXI from 'pixi.js'
//import { ChapterType } from 'src/chapters/base/ChapterType'
//import { ZendoName } from 'src/chapters/ZendoChapter'
//import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
//import { PartChainFactory } from 'src/factories/PartChainFactory'
//import { PixiCardFactory } from 'src/factories/PixiCardFactory'
//import { SelectorFactory } from 'src/factories/SelectorFactory'
//import { LoaderType } from 'src/modules/partChain/PartLoader'
//import { CardOptions } from 'src/modules/pixi/Pixi'
//import { Dimensions, imageFrame } from 'src/modules/pixi/PixiShapes'
//import { Selector } from 'src/modules/selector/Selector'
//import { boardApp } from 'src/pixi/PixiApp'
//import { Promiser } from 'src/utils/Promiser'
//import { FlowComponent } from '../base/FlowComponent'
//import { PartChain } from '../base/PartChain'
//import { defaultTestFlags } from '../base/PartTester'
//import { ZendoPart6 } from './ZendoPart6'
//import { LINE_COLOR, headerStyle, zendoCardImage } from './ZendoStyles'

//export const ZendoPart5 = (previous: PartChain): PartChain => {
//return PartChainFactory('Zendo5', ChapterType.ZEN, previous)
//.mergeLoader(LoaderType.FLOW, component, attachPreviousComponent)
//.setTestFlags(defaultTestFlags())
//.setNextParts(ZendoPart6)
//.build()
//}

//const attachPreviousComponent = (factory: FlowComponentFactory, previous: FlowComponent): void => {
//factory.mergePixiLine(previous, LINE_COLOR)
//}

//const component = (factory: FlowComponentFactory): FlowComponent => {
//const cardOptions: CardOptions = {
//borderColor: 0x200900,
//alpha: 1,
//x: 3200,
//y: 400,
//width: 400,
//height: 250,
//pivotCenter: false
//}

//const hdStyle = headerStyle()
//hdStyle.fontSize = 42
//hdStyle.fill = '#999'
//const header = new PIXI.Text('Zazen', hdStyle)
//header.x = cardOptions.width / 2
//header.y = 50
//header.anchor.set(0.5)

//const paragraphText = 'Also known as sitting meditation.'
//const paragraphStyle = new PIXI.TextStyle({
//fontSize: 32,
//fontFamily: 'Monaco',
//fill: '#DDD',
//stroke: '#000',
//strokeThickness: 1,
//dropShadow: true,
//dropShadowColor: '#000',
//dropShadowDistance: 2,
//dropShadowBlur: 2,
//letterSpacing: 1.5,
//wordWrap: true,
//wordWrapWidth: 250
//})

//const paragraph = new PIXI.Text(paragraphText, paragraphStyle)
//paragraph.x = 30
//paragraph.y = 90

//const cardData = PixiCardFactory(cardOptions, factory.component.chapter, ZendoName.START)
//.setImageCard(zendoCardImage(cardOptions.width, cardOptions.height))
//.addChild(header, paragraph, logo())
//.setOffset(150, 150)
//.elevate(12)
//.build()

//factory.mergePixiCard(cardData.containerName, cardData.card)
//const component = factory.component
//component.selector.append(selector(component))
//return component
//}

//const logo = (): PIXI.Container => {
//const buddhaLogo = PIXI.Sprite.from('src/assets/zendo/Buddha-logo.png')
//buddhaLogo.x = 250
//buddhaLogo.y = 72
//buddhaLogo.width = 125
//buddhaLogo.height = 150

//const filter = new PIXI.filters.ColorMatrixFilter()
//filter.negative(true)

//const filter2 = new PIXI.filters.ColorMatrixFilter()
//const filter3 = new PIXI.filters.NoiseFilter()

//filter3.noise = 0.6
//filter2.brightness(0.1, true)

//buddhaLogo.filters = [filter, filter3, filter2]

//const container = new PIXI.Container()
//container.addChild(buddhaLogo)
//return container
//}

//const selector = (component: FlowComponent): Selector => {
//const { root } = component.chapter
//const { card } = component.pixi

//const zazenTexture = PIXI.Texture.from('src/assets/zendo/zazen.jpg')
//const zazenDimensions: Dimensions = {
//width: 400,
//height: 532,
//x: card.x + card.width + 200,
//y: card.y - 100
//}

//const zazenFrame = imageFrame(zazenTexture, zazenDimensions, 5)

//const bonsaiTexture = PIXI.Texture.from('src/assets/zendo/bonsai.jpg')
//const colorFilter = new PIXI.filters.ColorMatrixFilter()
//colorFilter.greyscale(0.3, true)

//const bonsaiDimensions: Dimensions = {
//width: 400,
//height: 532,
//x: zazenDimensions.x + zazenDimensions.width + 200,
//y: zazenDimensions.y
//}

//const bonsaiFrame = imageFrame(bonsaiTexture, bonsaiDimensions, 5, [colorFilter])

//bonsaiFrame.alpha = zazenFrame.alpha = 0

//const select = async (): Promise<void> => {
//const promise = Promiser<void>()
//root.addChild(zazenFrame, bonsaiFrame)

//const show = (delta: number): void => {
//bonsaiFrame.alpha = zazenFrame.alpha += 0.01 * delta

//if (zazenFrame.alpha >= 1) {
//boardApp.ticker.remove(show)
//promise.resolve()
//}
//}

//setTimeout(() => boardApp.ticker.add(show), 1000)
//return promise.promise
//}

//const unselect = async (): Promise<void> => {
//bonsaiFrame.alpha = zazenFrame.alpha = 0
//root.removeChild(zazenFrame, bonsaiFrame)
//}

//return SelectorFactory(new Selector('Zazen image part 5')).setSelect(select).setUnselect(unselect).build()
//}
