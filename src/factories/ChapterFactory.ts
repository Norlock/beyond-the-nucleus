import { Chapter, ContainerData } from 'src/chapters/base/Chapter'
import { ChapterType } from 'src/chapters/base/ChapterType'
import { AudioComponent } from 'src/modules/audio/AudioComponent'
import { MergeAudioUtility } from 'src/modules/audio/MergeAudioUtility'
import { ChapterSelector } from 'src/modules/selector/ChapterSelector'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp } from 'src/pixi/PixiApp'

export const ChapterFactory = (chapterType: ChapterType, x: number, y: number) => {
    const self = new Chapter(chapterType)
    self.root.x = x
    self.root.y = y
    self.selector = new ChapterSelector(self)

    MergeAudioUtility(self)

    // TODO init function maybe
    boardApp.stage.addChild(self.root)

    const addAudio = (audio: AudioComponent, tag: string) => {
        self.audio.addComponent(audio, tag)
        return factory
    }

    const addContainer = (data: ContainerData) => {
        const { container, name, selector } = data

        const nameExists = self.root.children.some((x) => x.name === name)
        if (nameExists) {
            throw new Error(`Container with name: ${name} already exists in chapter`)
        }

        container.name = name
        self.root.addChild(container)

        if (selector) {
            self.selector.addSelector(name, selector)
        }

        return factory
    }

    const appendSelector = (selector: Selector) => {
        self.selector.append(selector)
        return factory
    }

    const factory = {
        chapter: self,
        addContainer,
        addAudio,
        appendSelector
    }

    return factory
}
