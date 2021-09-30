import * as PIXI from 'pixi.js'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { PixiComponentFactory } from 'src/factories/PixiComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Selector } from 'src/modules/selector/Selector'
import { PixiComponent } from '../base/PixiComponent'
import { spaceStyles } from './SpaceStyles'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import earthImg from 'src/assets/space/earth-3d.jpg'
import { PixiChapter } from 'src/chapters/base/PixiChapter'
import { initThreeJS, addMouseHandler, removeMouseHandler, rotateSphere } from './SpaceThree'
import { GlowFilter } from 'pixi-filters'
import { boardApp } from 'src/pixi/PixiApp'

const componentX = 3800
const componentY = 1300
const xOffset = 200
const yOffset = 150

// Earth
export const SpacePart2 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: spaceStyles.BORDER_COLOR,
        alpha: 1,
        x: componentX,
        y: componentY,
        width: 400,
        height: 280,
        pivotCenter: false
    }

    const header = new PIXI.Text('Earth', spaceStyles.headerStyle())
    header.x = 30
    header.y = 25

    const paragraphText = `Is the third planet from the Sun, and orbits with a velocity of 107 200 km/h or 66 600 mph`
    const paragraph = new PIXI.Text(paragraphText, spaceStyles.paragraphStyle(cardOptions.width - 40))
    paragraph.x = 30
    paragraph.y = 100

    const chapter = chapters.get(data.chapterId) as PixiChapter

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setFilters(spaceStyles.filters)
        .setOffset(xOffset, yOffset)
        .build()

    const factory = PixiComponentFactory(data.id, chapter.chapterId, param)
    factory.appendSelector(selector(chapter.find(data.containerName)))

    return factory.component
}

const selector = (container: PIXI.Container) => {
    const { scene, texture, renderer, camera } = initThreeJS()
    const earth = earthAnimate(scene)

    const glowFilter = new GlowFilter({ color: 0x0000dd, innerStrength: 0, outerStrength: 1 })
    const sprite = new PIXI.Sprite(texture)
    sprite.x = componentX
    sprite.y = componentY - 100
    sprite.width = window.innerWidth
    //sprite.filters = [glowFilter]

    const selector = new Selector('Show Earth')

    const animate = () => {
        earth.animate()

        renderer.render(scene, camera)
        texture.update()
    }

    selector.activate = async () => {
        container.addChild(sprite)

        addMouseHandler()

        boardApp.ticker.add(animate)
    }

    selector.idle = async () => {
        boardApp.ticker.remove(animate)
        removeMouseHandler()
    }

    selector.deactivate = async () => {
        boardApp.ticker.remove(animate)
        container.removeChild(sprite)
        removeMouseHandler()
    }

    return selector
}

export const earthRadius = 5

const earthAnimate = (scene: THREE.Scene) => {
    // create a sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(earthRadius, 50, 50),
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load(earthImg)
                }
            }
        })
    )

    // create a sphere
    const group = new THREE.Group()
    group.position.x = -4
    group.position.y = -1

    group.add(sphere)
    scene.add(group)

    const animate = () => {
        sphere.rotation.y += 0.001
        rotateSphere(group)
    }

    return { animate }
}
