import * as PIXI from 'pixi.js'
import { ZendoName } from 'src/chapters/ZendoChapter'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { kungfuLoader } from 'src/games/kungfu/KungfuLoader'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { FlowComponent } from '../base/FlowComponent'
import { headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles'
import { MergeKungfuResourceHandler } from 'src/games/kungfu/KungfuResources'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { GameComponentFactory } from 'src/factories/GameComponentFactory'

export const ZendoPart6 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 6000,
        y: 500,
        width: 400,
        height: 400,
        pivotCenter: false
    }

    const header = new PIXI.Text('Kungfu fighters!', headerStyle())
    header.x = cardOptions.width / 2
    header.y = 40
    header.anchor.set(0.5)

    const paragraphText = 'Defeat the enemies and make sure to avoid getting hit'
    const paragraph = new PIXI.Text(paragraphText, paragraphStyle(cardOptions.width - 40))
    paragraph.x = 20
    paragraph.y = 75

    const kungfuLogo = PIXI.Sprite.from('src/assets/zendo/kungfu/kungfu-icon.jpg')
    kungfuLogo.width = 100
    kungfuLogo.height = 100
    kungfuLogo.x = 100
    kungfuLogo.y = 100
    kungfuLogo.anchor.set(0.5)

    const logoContainer = new PIXI.Graphics()
        .lineStyle(2, 0x000000, 1)
        .beginFill(0xffffff)
        .drawCircle(100, 100, 80)
        .endFill()

    logoContainer.addChild(kungfuLogo)
    logoContainer.x = 100
    logoContainer.y = 150

    const chapter = chapters.get(data.chapterId)
    const cardData = PixiCardFactory(cardOptions, chapter, ZendoName.START)
        .setImageCard(zendoCardImage(400, 400))
        .addChild(header, paragraph, logoContainer)
        .setOffset(150, 130)
        .elevate(12)
        .build()

    const factory = GameComponentFactory(data.id, chapter.chapterId, cardData)
    const component = factory.mergeGameLoader(kungfuLoader(factory.component)).component

    MergeKungfuResourceHandler(component)
    return component
}
