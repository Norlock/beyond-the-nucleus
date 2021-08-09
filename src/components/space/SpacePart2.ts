import * as PIXI from 'pixi.js'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'
import { FlowComponent } from '../base/FlowComponent'
import { spaceStyles } from './SpaceStyles'

const componentX = 3800
const componentY = 1200

export const SpacePart2 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x778899,
        alpha: 1,
        x: componentX,
        y: componentY,
        width: 400,
        height: 390,
        pivotCenter: false
    }

    const header = new PIXI.Text('Earth', spaceStyles.headerStyle())
    header.x = 30
    header.y = 25

    const paragraphText = `Is the third planet from the Sun, and orbits with a velocity of 107 200 km/h or 66 600 mph`
    const paragraph = new PIXI.Text(paragraphText, spaceStyles.paragraphStyle(cardOptions.width - 40))
    paragraph.x = 30
    paragraph.y = 100

    const chapter = chapters.get(data.chapterId)

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(boardApp.screen.width - 700, 400)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, param)
    factory.appendSelector(selector(chapter.find(data.containerName)))

    return factory.component
}

const selector = (container: PIXI.Container) => {
    const mask = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 200).endFill()

    const texture = PIXI.Texture.from('src/assets/space/earth-3d.jpg')

    const earth = new PIXI.TilingSprite(texture, 200, 200)
    //const earth = new PIXI.Sprite(texture)
    earth.anchor.set(0.5, 0.5)
    earth.x = componentX - 600
    earth.y = componentY - 50
    earth.width = 200
    earth.height = 200

    earth.mask = mask
    earth.addChild(mask)

    const selector = new Selector('Show earth')
    selector.activate = async () => {
        container.addChild(earth)
    }
    selector.deactivate = async () => {
        container.removeChild(earth)
    }

    return selector
}
