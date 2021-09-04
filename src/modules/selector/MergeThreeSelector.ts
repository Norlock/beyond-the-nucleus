import { ThreeChapter } from 'src/chapters/base/ThreeChapter'
import { ThreeComponent } from 'src/components/base/ThreeComponent'
import { chapters } from 'src/elm-bridge'
import { GetAudio } from '../audio/GetAudio'
import { Selector, StandardSelectorTag } from './Selector'

// Selector Audio
const audio = GetAudio('/src/assets/audio/woosh.wav', false, 0.3).element
const ctx = new AudioContext()
const filter = ctx.createBiquadFilter()
filter.frequency.value = 2020
const media = ctx.createMediaElementSource(audio)
media.connect(filter)
filter.connect(ctx.destination)

export const MergeThreeSelector = (self: ThreeComponent): void => {
    const selector = new Selector(StandardSelectorTag.FLOW)
    const chapter = chapters.get(self.chapterId) as ThreeChapter

    const winResize = () => onWindowResize(self)

    selector.activate = async () => {
        audio.load()
        audio.play()

        chapter.scene.add(self.card)
        window.addEventListener('resize', winResize)

        scrollToCard(self)
        await selector.next?.recursivelyActivate()
    }

    selector.idle = async () => {
        await selector.next.recursivelyIdle()
        self.card.visible = false
    }

    selector.deactivate = async () => {
        await selector.next?.recursivelyDeactivate()
        window.removeEventListener('resize', winResize)
        chapter.scene.remove(self.card)
    }

    self.selector = selector
}

const scrollToCard = (self: ThreeComponent) => {
    console.log('test', self)
}

const onWindowResize = (self: ThreeComponent) => {
    const chapter = chapters.get(self.chapterId) as ThreeChapter
    const { camera, renderer } = chapter
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}
