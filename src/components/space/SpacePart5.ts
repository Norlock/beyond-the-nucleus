import * as PIXI from 'pixi.js'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { PixiComponentFactory } from 'src/factories/PixiComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Selector } from 'src/modules/selector/Selector'
import { PixiComponent } from '../base/PixiComponent'
import { spaceStyles } from './SpaceStyles'
import * as THREE from 'three'
import * as PP from 'postprocessing'

import { PixiChapter } from 'src/chapters/base/PixiChapter'

const componentX = 2100
const componentY = 2800
const xOffset = 100
const yOffset = 100

// Jupiter
export const SpacePart5 = (data: ElmComponent): PixiComponent => {
    const cardOptions: CardOptions = {
        borderColor: spaceStyles.BORDER_COLOR,
        alpha: 1,
        x: componentX,
        y: componentY,
        width: 500,
        height: 450,
        pivotCenter: false
    }

    const header = new PIXI.Text('Nebula', spaceStyles.headerStyle())
    header.x = 30
    header.y = 25

    const paragraphText =
        'Nebulae are often star-forming regions, such as in the "Pillars of Creation" in the Eagle Nebula. In these regions, the formations of gas, dust, and other materials "clump" together to form denser regions, which attract further matter, and eventually will become dense enough to form stars.'
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
    const { texture, composer, cloudParticles } = initThreeJS()

    const sprite = new PIXI.Sprite(texture)
    sprite.x = componentX + 350
    sprite.y = componentY - yOffset
    sprite.width = window.innerWidth

    sprite.alpha = 0.95
    sprite.scale.set(0.8)

    const selector = new Selector('Show Nebula')
    const clock = new THREE.Clock()

    let isSelected = false

    selector.activate = async () => {
        isSelected = true
        container.addChild(sprite)

        const animate = () => {
            cloudParticles.forEach((p) => {
                p.rotation.z -= 0.0005
            })
            composer.render(clock.getDelta())
            texture.update()

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

const initThreeJS = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000)

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        powerPreference: 'high-performance',
        antialias: false,
        stencil: false,
        depth: false
    })

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    camera.rotation.x = 1.16
    camera.rotation.y = -0.12
    camera.rotation.z = 0.27

    const ambient = new THREE.AmbientLight(0x444484)
    const directionalLight = new THREE.DirectionalLight(0xff8c19)
    directionalLight.position.set(0, 0, 1)

    const orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7)
    orangeLight.position.set(200, 300, 100)

    const redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7)
    redLight.position.set(100, 300, 100)

    const blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7)
    blueLight.position.set(300, 300, 300)

    scene.add(camera, ambient, directionalLight, orangeLight, redLight, blueLight)
    scene.fog = new THREE.FogExp2(0x223522, 0.001)

    const cloudParticles: THREE.Mesh[] = []

    let loader = new THREE.TextureLoader()
    loader.load('src/assets/space/smoke-1.png', (texture) => {
        const cloudGeo = new THREE.PlaneBufferGeometry(500, 500)
        const cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        })

        for (let p = 0; p < 50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial)
            cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 600)
            cloud.scale.set(0.85, 0.85, 0.85)

            cloud.rotation.x = 1.16
            cloud.rotation.y = -0.12
            cloud.rotation.z = Math.random() * 2 * Math.PI
            cloud.material.opacity = 0.8

            cloudParticles.push(cloud)
            scene.add(cloud)
        }
    })

    const composer = postprocessing(renderer, scene, camera)
    return { texture: PIXI.Texture.from(renderer.domElement), composer, cloudParticles }
}

const postprocessing = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    const bloomEffect = new PP.BloomEffect({
        blendedFunction: PP.BlendFunction.COLOR_DODGE,
        kernelSize: PP.KernelSize.SMALL,
        useLuminanceFilter: true,
        luminanceThreshold: 0.1,
        luminanceSmoothing: 0.7
    })

    bloomEffect.blendMode.opacity.value = 1.4

    const effectPass = new PP.EffectPass(camera, bloomEffect)
    effectPass.renderToScreen = true

    const composer = new PP.EffectComposer(renderer)
    composer.addPass(new PP.RenderPass(scene, camera))
    composer.addPass(effectPass)
    return composer
}
