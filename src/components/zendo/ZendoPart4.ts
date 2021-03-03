import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { Selector } from 'src/modules/selector/Selector';
import { pixiApp } from 'src/pixi/PixiApp';
import { Promiser } from 'src/utils/Promiser';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { TestFlags } from '../base/PartTester';
import { ZendoPart5 } from './ZendoPart5';

export class ZendoPart4 extends PartChain {
    constructor(previous: PartChain) {
        super("Zendo4", ChapterType.ZEN, previous)
    }

    buildComponent(chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent {
        return component(chapter, previous, tag);
    }

    getNextParts(): PartChain[] {
        return [ new ZendoPart5(this)];
    }

    getTestFlags(standard: TestFlags): TestFlags {
        return standard;
    }
}

const component = (chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent => {
    const cardOptions: CardOptions = {
        alpha: 1,
        x: 2200,
        y: 1500,
        width: pixiApp.screen.width - 400,
        height: pixiApp.screen.height - 100,
        pivotCenter: false,
    };

    const components = PixiCardFactory(cardOptions, chapter, ZendoName.START)
        .setColorCard(0x000000)
        .setOffset(200, 50)
        .build();

    let video: PIXI.Sprite; 
    const select = async () => {
        const promise = Promiser<void>();
        video = PIXI.Sprite.from("http://localhost:8765/what-is-zen.mp4");
        video.width = cardOptions.width - 10
        video.height = cardOptions.height - 10
        video.x = 5
        video.y = 5

        setTimeout(() => {
            components.card.component.addChild(video);
            promise.resolve();
        }, 1000);

        return promise.promise;
    };

    const unselect = async () => {
        components.card.component.removeChild(video);
        video.texture.baseTexture.destroy();
    };

    const selector = SelectorFactory(new Selector("What is zen, video"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    const component = FlowComponentFactory(chapter, tag)
        .mergeMover(previous)
        .mergePixi(components)
        .build();

    component.selector.appendSelector(selector);
    return component;
};

