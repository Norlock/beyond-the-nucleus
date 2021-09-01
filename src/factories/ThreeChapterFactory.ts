import { ChapterType } from 'src/chapters/base/ChapterType'
import { Coordinates, ThreeChapter } from 'src/chapters/base/ThreeChapter'
import { AudioComponent } from 'src/modules/audio/AudioComponent'
import { MergeAudioUtility } from 'src/modules/audio/MergeAudioUtility'
import { Selector } from 'src/modules/selector/Selector'
import { ThreeChapterSelector } from 'src/modules/selector/ThreeChapterSelector'

export const ThreeChapterFactory = (chapterType: ChapterType, coordinates: Coordinates) => {
    const self = new ThreeChapter(chapterType, coordinates)
    self.selector = new ThreeChapterSelector(self.scene)

    MergeAudioUtility(self)

    const addAudio = (audio: AudioComponent, tag: string) => {
        self.audio.addComponent(audio, tag)
        return factory
    }

    const appendSelectors = (...selector: Selector[]) => {
        selector.forEach((s) => self.selector.append(s))
        return factory
    }

    const factory = {
        chapter: self,
        addAudio,
        appendSelectors
    }

    return factory
}
