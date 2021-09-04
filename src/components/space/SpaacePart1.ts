import { ChapterType } from 'src/chapters/base/ChapterType'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { ThreeComponentFactory } from 'src/factories/ThreeComponentFactory'
import * as THREE from 'three'
import { ThreeComponent } from '../base/ThreeComponent'
import { ThreeChapter } from 'src/chapters/base/ThreeChapter'
import { ThreeCardFactory } from 'src/factories/ThreeCardFactory'

export const SpaacePart1 = (data: ElmComponent): ThreeComponent => {
    //const cardOptions: CardOptions = {
    //borderColor: 0x778899,
    //alpha: 1,
    //x: 800,
    //y: 800,
    //width: 400,
    //height: 390,
    //pivotCenter: false
    //}

    const factory = ThreeComponentFactory(data.id, ChapterType.SPACE)

    const card = ThreeCardFactory(500, 500)
        .drawBackground('red', { color: '#777', width: 10 })
        .drawText('Ok is goed', { font: '80px sans-serif', x: 50, y: 80, color: 'white' })

    //const geometry = new THREE.BoxGeometry()

    //const canvas = document.createElement('canvas')
    //canvas.width = 500
    //canvas.height = 500

    //const ctx = canvas.getContext('2d')
    //const texture = new THREE.CanvasTexture(canvas)
    //const material = new THREE.MeshBasicMaterial({ map: texture })

    //ctx.fillStyle = 'red'
    //ctx.fillRect(0, 0, 500, 400)
    //ctx.fillStyle = 'black'
    //ctx.font = '80px sans-serif'
    //ctx.fillText('Ok is goed', 50, 90)
    //const cube = new THREE.Mesh(geometry, material)
    card.position.setZ(48)

    factory.setCard(card)
    //const text = new THREE.TextGeometry("First in space", { font: THREE.Font.  size: 16 })
    //const header = new PIXI.Text('First in space', spaceStyles.headerStyle())
    //header.x = 30
    //header.y = 25

    //const paragraphText = `On April 12, 1968 aboard the spacecraft Vostok 1, Soviet cosmonaut Yuri Alekseyevich Gagarin became the first human being to travel into space.`
    //const paragraph = new PIXI.Text(paragraphText, spaceStyles.paragraphStyle(cardOptions.width - 40))
    //paragraph.x = 30
    //paragraph.y = 100

    //const chapter = chapters.get(data.chapterId)

    //const param = PixiCardFactory(cardOptions, chapter, data.containerName)
    //.setColorCard(0x000000)
    //.addChild(header, paragraph)
    //.setOffset(300, 300)
    //.build()

    //const factory = PixiComponentFactory(data.id, chapter.chapterId, param)

    //return factory.component
    return factory.component
}
