import { FlowComponent } from 'src/components/base/FlowComponent'
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

export const MergeFlowSelector = (self: FlowComponent): void => {
    const selector = new Selector(StandardSelectorTag.FLOW)

    selector.select = async () => {
        audio.load()
        audio.play()

        await selector.next?.recursivelySelect()
    }

    selector.unselect = async () => {
        await selector.next?.recursivelyUnselect()
    }

    self.selector = selector
}
