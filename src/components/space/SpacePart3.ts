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

import marsImg from 'src/assets/space/mars-3d.jpg'
import { PixiChapter } from 'src/chapters/base/PixiChapter'
import { initThreeJS, mouseHandler, rotateSphere } from './SpaceThree'

const componentX = 5200
const componentY = 1200
const xOffset = 300
const yOffset = 200

// Mars
export const SpacePart3 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: spaceStyles.BORDER_COLOR,
        alpha: 1,
        x: componentX,
        y: componentY,
        width: 480,
        height: 350,
        pivotCenter: false
    }

    const header = new PIXI.Text('Mars', spaceStyles.headerStyle())
    header.x = 30
    header.y = 25

    const paragraphText = `Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth`
    const paragraph = new PIXI.Text(paragraphText, spaceStyles.paragraphStyle(cardOptions.width - 60))
    paragraph.x = 30
    paragraph.y = 100

    const chapter = chapters.get(data.chapterId) as PixiChapter

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(xOffset, yOffset)
        .setFilters(spaceStyles.filters)
        .build()

    const factory = PixiComponentFactory(data.id, chapter.chapterId, param)
    factory.appendSelector(selector(chapter.find(data.containerName)))

    return factory.component
}

const selector = (container: PIXI.Container) => {
    const threeJs = initThreeJS()
    const mars = marsAnimate(threeJs.scene)

    const sprite = new PIXI.Sprite(threeJs.texture)
    sprite.x = componentX
    sprite.y = componentY - 250
    sprite.width = window.innerWidth

    const selector = new Selector('Show Mars')

    let isSelected = false
    selector.activate = async () => {
        isSelected = true
        container.addChild(sprite)

        mouseHandler()

        const animate = () => {
            mars.animate()

            threeJs.renderer.render(threeJs.scene, threeJs.camera)
            threeJs.texture.update()

            if (isSelected) {
                requestAnimationFrame(animate)
            }
        }
        animate()
    }

    selector.idle = async () => {
        isSelected = false
    }

    selector.deactivate = async () => {
        isSelected = false
        container.removeChild(sprite)
    }

    return selector
}

const marsAnimate = (scene: THREE.Scene) => {
    // create a sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 50, 50),
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load(marsImg)
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
