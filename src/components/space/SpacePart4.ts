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

import jupiterImg from 'src/assets/space/jupiter-3d.jpg'
import { PixiChapter } from 'src/chapters/base/PixiChapter'
import { initThreeJS, mouseHandler, rotateSphere } from './SpaceThree'
import { earthRadius } from './SpacePart2'

const componentX = 5100
const componentY = 1800
const xOffset = 200
const yOffset = 200

// Jupiter
export const SpacePart4 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x778899,
        alpha: 1,
        x: componentX,
        y: componentY,
        width: 500,
        height: 350,
        pivotCenter: false
    }

    const header = new PIXI.Text('Jupiter', spaceStyles.headerStyle())
    header.x = 30
    header.y = 25

    const paragraphText = `Is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun`
    const paragraph = new PIXI.Text(paragraphText, spaceStyles.paragraphStyle(cardOptions.width - 40))
    paragraph.x = 30
    paragraph.y = 100

    const chapter = chapters.get(data.chapterId) as PixiChapter

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(xOffset, yOffset)
        .build()

    const factory = PixiComponentFactory(data.id, chapter.chapterId, param)
    factory.appendSelector(selector(chapter.find(data.containerName)))

    return factory.component
}

const selector = (container: PIXI.Container) => {
    const threeJs = initThreeJS()
    const jupiter = jupiterAnimate(threeJs.scene)

    const sprite = new PIXI.Sprite(threeJs.texture)
    sprite.x = componentX
    sprite.y = componentY - 250
    sprite.width = window.innerWidth

    const selector = new Selector('Show Jupiter')

    selector.activate = async () => {
        container.addChild(sprite)

        mouseHandler()

        const animate = () => {
            jupiter.animate()

            threeJs.renderer.render(threeJs.scene, threeJs.camera)
            threeJs.texture.update()

            requestAnimationFrame(animate)
        }
        animate()
    }

    selector.deactivate = async () => {
        container.removeChild(sprite)
    }

    return selector
}

const jupiterAnimate = (scene: THREE.Scene) => {
    // create a sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load(jupiterImg)
                }
            }
        })
    )

    // create a sphere
    const group = new THREE.Group()

    group.add(sphere)
    scene.add(group)

    const animate = () => {
        sphere.rotation.y += 0.00095
        rotateSphere(group)
    }

    return { animate }
}
