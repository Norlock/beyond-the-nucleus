import { ChapterType } from 'src/chapters/base/ChapterType'
import { ThreeChapter } from 'src/chapters/base/ThreeChapter'
import { AudioComponent } from 'src/modules/audio/AudioComponent'
import { MergeAudioUtility } from 'src/modules/audio/MergeAudioUtility'
import { Selector } from 'src/modules/selector/Selector'
import { ThreeChapterSelector } from 'src/modules/selector/ThreeChapterSelector'

export const ThreeChapterFactory = (chapterType: ChapterType, x: number, y: number) => {
    const self = new ThreeChapter(chapterType)
    self.x = x
    self.y = y
    self.selector = new ThreeChapterSelector(self.root)

    MergeAudioUtility(self)

    //boardApp.stage.addChild(self.root)

    const addAudio = (audio: AudioComponent, tag: string) => {
        self.audio.addComponent(audio, tag)
        return factory
    }

    const appendSelector = (selector: Selector) => {
        self.selector.append(selector)
        return factory
    }

    const factory = {
        chapter: self,
        addAudio,
        appendSelector
    }

    return factory
}
