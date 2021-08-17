import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Selector } from 'src/modules/selector/Selector'
import { FlowComponent } from '../base/FlowComponent'
import { spaceStyles } from './SpaceStyles'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import earthImg from 'src/assets/space/earth-3d.jpg'
import marsImg from 'src/assets/space/mars-3d.jpg'

const componentX = 3800
const componentY = 1200

const mouse = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    track: false
}

export const SpacePart2 = (data: ElmComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x778899,
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

    const chapter = chapters.get(data.chapterId)

    const param = PixiCardFactory(cardOptions, chapter, data.containerName)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(200, 50)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, param)
    factory.appendSelector(selector(chapter.find(data.containerName)))

    return factory.component
}

const selector = (container: PIXI.Container) => {
    const threeJs = initThreeJS()
    const { earth, mars } = threeJs.planets

    const sprite = new PIXI.Sprite(threeJs.texture)
    sprite.x = componentX - 550
    sprite.y = componentY + 50

    const selector = new Selector('Show earth')

    selector.activate = async () => {
        container.addChild(sprite)

        mouseHandler()

        const animate = () => {
            earth.animate()
            mars.animate()

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

const mouseHandler = () => {
    addEventListener('mousedown', (event) => {
        mouse.startX = event.clientX / innerWidth
        mouse.startY = event.clientY / innerWidth
        mouse.track = true
    })

    addEventListener('mouseup', (_event) => {
        mouse.track = false
    })

    addEventListener('mousemove', (event) => {
        if (mouse.track) {
            const newX = event.clientX / innerWidth
            const newY = event.clientY / innerWidth
            mouse.x += newX - mouse.startX
            mouse.y += newY - mouse.startY
        }
    })
}

const initThreeJS = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    camera.position.z = 15
    camera.position.x = 0
    camera.position.y = 0

    scene.add(camera)
    const planets = { earth: earthAnimate(scene), mars: marsAnimate(scene) }

    return { texture: PIXI.Texture.from(renderer.domElement), scene, camera, renderer, planets }
}

const earthAnimate = (scene: THREE.Scene) => {
    // create a sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
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
        gsap.to(group.rotation, {
            x: mouse.y / 10,
            y: mouse.x / 10
            //duration: 2
        })
    }

    return { animate }
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
    group.position.x = 6
    group.position.y = -1

    group.add(sphere)
    scene.add(group)

    const animate = () => {
        sphere.rotation.y += 0.00095
        gsap.to(group.rotation, {
            x: mouse.y / 10,
            y: mouse.x / 10
            //duration: 2
        })
    }

    return { animate }
}
