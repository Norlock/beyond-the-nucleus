import { Chapter, ContainerData } from 'src/chapters/base/Chapter';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { AudioComponent } from 'src/modules/audio/AudioComponent';
import { MergeAudioUtility } from 'src/modules/audio/MergeAudioUtility';
import { MergeChapterSelector } from 'src/modules/selector/MergeChapterSelector';
import { Selector } from 'src/modules/selector/Selector';
import { pixiApp } from 'src/pixi/PixiApp';

export const ChapterFactory = (chapterType: ChapterType, x: number, y: number, name: string) => {
    const self = new Chapter(name);
    self.chapterType = chapterType;
    self.root.x = x;
    self.root.y = y;

    MergeAudioUtility(self);
    MergeChapterSelector(self);

    pixiApp.stage.addChild(self.root);

    const addAudio = (audio: AudioComponent, tag: string) => {
        self.audio.addComponent(audio, tag);
        return factory
    };

    const addContainer = (data: ContainerData) => {
        const { container, name, selector } = data;

        const nameExists = self.root.children.some(x => x.name === name);
        if (nameExists) {
            throw new Error(`Container with name: ${name} already exists in chapter`);
        }

        container.name = name;
        self.root.addChild(container);
        
        if (selector) {
            self.selector.containerSelector.addSelector(name, selector);
        }

        return factory
    };

    const appendSelector = (selector: Selector) => {
        self.selector.append(selector);
        return factory;
    };

    const factory = {
        chapter: self,
        addContainer,
        addAudio,
        appendSelector,
    };

    return factory;
};
