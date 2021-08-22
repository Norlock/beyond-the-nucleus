import * as PIXI from 'pixi.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import goldFish from 'src/assets/ocean/goldfish.glb'
import { Selector } from 'src/modules/selector/Selector'

const perspective = 800

export const seaLife = (container: PIXI.Container) => {
    console.log('juustem', container)
    // this equation
    const fov = (180 * (2 * Math.atan(innerHeight / 2 / perspective))) / Math.PI

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(fov, innerWidth / innerHeight, 0.1, 1000)
    camera.position.set(0, 0, perspective)

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })

    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    camera.position.z = 12
    camera.position.x = 0
    camera.position.y = -5

    //camera.rotateY(1)

    scene.add(camera)

    const lightPoint = new THREE.AmbientLight(0xccccff, 1)
    scene.add(lightPoint)

    const texture = PIXI.Texture.from(renderer.domElement)
    const sprite = new PIXI.Sprite(texture)
    sprite.x = 1000
    sprite.y = 400

    const loader = new GLTFLoader()
    loader.load(goldFish, (gltf) => {
        const model = gltf.scene
        scene.add(model)

        const mixer = new THREE.AnimationMixer(model)
        const idle = mixer.clipAction(gltf.animations[0])
        idle.play()

        container.addChild(sprite)

        const animate = () => {
            renderer.render(scene, camera)
            //texture.update()

            //model.position.x += 0.01
            //model.rotateY(0.01)
            requestAnimationFrame(animate)
        }
        animate()
    })

    //const selector = new Selector('School fish')

    //selector.activate = async () => {
    ////container.addChild(sprite)

    //const animate = () => {
    //renderer.render(scene, camera)
    ////texture.update()
    //}
    //animate()
    //}

    //selector.deactivate = async () => {
    ////container.removeChild(sprite)
    //}

    //return selector
}
