import * as PIXI from 'pixi.js'
import * as THREE from 'three'
import { initThreeJS } from 'src/components/space/SpaceThree'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import telescopeGLB from 'src/assets/space/telescope.glb'

export const createTelescope = (container: PIXI.Container) => {
    const telescopeContainer = new PIXI.Container()
    telescopeContainer.x = 800
    telescopeContainer.y = 2000

    const rock = PIXI.Sprite.from('src/assets/space/mountain.png')
    rock.scale.set(0.5)
    rock.anchor.set(0.5)
    telescopeContainer.addChild(rock)

    console.log('container', container)
    const { scene, camera, texture, renderer } = initThreeJS()

    const telescope = new PIXI.Sprite(texture)
    telescope.width = window.innerWidth
    telescope.anchor.set(0.5)
    telescope.y = -200
    telescopeContainer.addChild(telescope)

    const loader = new GLTFLoader()
    loader.load(telescopeGLB, (gltf) => {
        const model = gltf.scene
        model.scale.set(1, 1, 1)
        //model.position.setX(-6)
        //model.position.setY(-2)
        //const ambient = new THREE.AmbientLight(0xccccff)
        const point1 = new THREE.PointLight(0xffffff)
        point1.position.set(-50, -20, 20)
        const point2 = new THREE.PointLight(0xffffff)
        point2.position.set(50, 50, 20)
        scene.add(gltf.scene, point1, point2)

        console.log('geladen')

        const animate = () => {
            texture.update()
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
    })

    container.addChild(telescopeContainer)
}
