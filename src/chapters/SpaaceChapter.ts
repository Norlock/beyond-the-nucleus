import { ThreeChapterFactory } from 'src/factories/ThreeChapterFactory'
import { GetAudio } from 'src/modules/audio/GetAudio'
import { ChapterType } from './base/ChapterType'
import * as THREE from 'three'
import { ThreeChapter } from './base/ThreeChapter'
import { Selector } from 'src/modules/selector/Selector'
import { SelectState } from 'src/modules/audio/AudioComponent'

enum AudioTag {
    AMBIENCE = 'ambience'
}

export const SpaaceChapter = () => {
    const audio = GetAudio('src/assets/space/ambient.mp3', true, 0.1)

    const factory = ThreeChapterFactory(ChapterType.SPACE, { x: 0, y: 0, z: 50 })
    factory.addAudio(audio, AudioTag.AMBIENCE)

    const chapter = factory.chapter
    factory.appendSelectors(visualSelector(chapter), audioSelector(chapter))
    return chapter
}

const visualSelector = (chapter: ThreeChapter) => {
    //const geometry = new THREE.SphereGeometry(5, 32, 16)
    //const sphere = new THREE.Mesh(geometry, material)

    const group = new THREE.Group()
    //group.position.x = 0
    //group.position.y = 0

    const randomPosition = () => {
        return Math.random() * 600 - 300
    }

    const { renderer, scene, camera } = chapter
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })

    for (let i = 0; i < 6000; i++) {
        let geometry = new THREE.SphereGeometry(0.1)
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.x = randomPosition()
        sphere.position.y = randomPosition()
        //sphere.position.z = randomPosition()
        group.add(sphere)
    }

    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    const selector = new Selector('Space chapter selector')
    selector.activate = async () => {
        scene.add(group)

        const animate = () => {
            renderer.render(scene, camera)
            //camera.position.z -= 0.01
            //camera.rotateZ(0.001)
            requestAnimationFrame(animate)
        }

        animate()
    }

    selector.deactivate = async () => {
        scene.remove(group)
    }

    return selector
}

const audioSelector = (self: ThreeChapter) => {
    const selector = new Selector('Chapter audio')
    selector.activate = async () => {
        setTimeout(() => {
            self.audio.select(AudioTag.AMBIENCE, SelectState.fadeIn)
        }, 200)
    }

    selector.deactivate = async () => {
        self.audio.selected.fadeOut()
    }

    return selector
}
