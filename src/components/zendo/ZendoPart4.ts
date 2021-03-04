import * as PIXI from 'pixi.js';
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
import { LINE_COLOR } from './ZendoStyles';

export class ZendoPart4 extends PartChain {
    constructor(previous: PartChain) {
        super("Zendo4", ChapterType.ZEN, previous)
    }

    buildComponent(factory: FlowComponentFactory): void {
        component(factory);
    }

    getNextParts(): PartChain[] {
        return [ new ZendoPart5(this) ];
    }

    attachPreviousComponent(factory: FlowComponentFactory, previous: FlowComponent): void {
        factory.mergePrevious(previous)
            .mergePixiLine(previous, LINE_COLOR);
    }

    getTestFlags(standard: TestFlags): TestFlags {
        return standard;
    }
}

const component = (factory: FlowComponentFactory): void => {
    const cardOptions: CardOptions = {
        alpha: 1,
        x: 2200,
        y: 1500,
        width: pixiApp.screen.width - 400,
        height: pixiApp.screen.height - 100,
        pivotCenter: false,
    };

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, ZendoName.START)
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
            cardData.card.component.addChild(video);
            promise.resolve();
        }, 1000);

        return promise.promise;
    };

    const unselect = async () => {
        cardData.card.component.removeChild(video);
        video.texture.baseTexture.destroy();
    };

    const selector = SelectorFactory(new Selector("What is zen, video"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    factory.mergePixiCard(cardData.containerName, cardData.card);
    factory.component.selector.append(selector);
};

