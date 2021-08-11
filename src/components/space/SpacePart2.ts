import * as PIXI from 'pixi.js'
import gsap from 'gsap'
import { chapters, ElmComponent } from 'src/elm-bridge'
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory'
import { PixiCardFactory } from 'src/factories/PixiCardFactory'
import { CardOptions } from 'src/modules/pixi/Pixi'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'
import { FlowComponent } from '../base/FlowComponent'
import { spaceStyles } from './SpaceStyles'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

import globeImg from 'src/assets/space/earth-3d.jpg'

const componentX = 3800
const componentY = 1200

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
        .setOffset(boardApp.screen.width - 700, 400)
        .build()

    const factory = FlowComponentFactory(data.id, chapter.chapterId, param)
    factory.appendSelector(selector())

    return factory.component
}

const selector = () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

    const canvas = document.getElementById('general-canvas')

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0) // the default

    // create a sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                globeTexture: {
                    value: new THREE.TextureLoader().load(globeImg)
                }
            }
        })
    )

    // create a sphere
    const atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 50, 50),
        new THREE.ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        })
    )

    atmosphere.scale.set(1.1, 1.1, 1.1)

    scene.add(atmosphere)

    const group = new THREE.Group()
    group.add(sphere)
    scene.add(group)

    camera.position.z = 15
    camera.position.x = 8
    camera.position.y = 2

    const mouse = {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
        track: false
    }

    const selector = new Selector('Show earth')
    selector.activate = async () => {
        canvas.appendChild(renderer.domElement)
        addEventListener('mousedown', (event) => {
            mouse.startX = event.clientX / innerWidth
            mouse.startY = event.clientY / innerWidth
            mouse.track = true
        })

        addEventListener('mouseup', (event) => {
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

        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
            sphere.rotation.y += 0.001
            gsap.to(group.rotation, {
                x: mouse.y / 10,
                y: mouse.x / 10
                //duration: 2
            })
        }
        animate()
    }

    selector.deactivate = async () => {
        canvas.removeChild(renderer.domElement)
    }

    return selector
}
