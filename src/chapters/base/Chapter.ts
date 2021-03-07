import { ChapterType } from './ChapterType';
import * as PIXI from 'pixi.js';
import { ChapterSelector, Selector, SelectorModule } from 'src/modules/selector/Selector';
import { AudioModule, AudioUtility } from 'src/modules/audio/AudioComponent';

export class Chapter implements SelectorModule, AudioModule {
    readonly title: string;
    root: PIXI.Container;
    chapterType: ChapterType;
    selector: ChapterSelector;
    audio: AudioUtility;

    constructor(title: string) {
        this.root = new PIXI.Container();
        this.root.sortableChildren = true;
        this.root.visible = false;
        this.title = title;
    }

    find(name: string): PIXI.Container {
        return this.root.children.find(x => x.name === name) as PIXI.Container;
    }
}

export interface ContainerData {
    container: PIXI.Container;
    name: string;
    selector?: Selector;
}

