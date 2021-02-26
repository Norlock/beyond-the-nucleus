import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { Selector } from 'src/modules/selector/Selector';
import { pixiApp } from 'src/pixi/PixiApp';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { ZendoPart5 } from './ZendoPart5';

export class ZendoPart4 extends PartChain {
    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [ new ZendoPart5(chapter, partToLink)];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
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
        video = PIXI.Sprite.from("http://localhost:8765/what-is-zen.mp4");
        video.width = cardOptions.width - 10
        video.height = cardOptions.height - 10
        video.x = 5
        video.y = 5

        setTimeout(() => {
            components.card.component.addChild(video);
        }, 500);
    };

    const unselect = async () => {
        components.card.component.removeChild(video);
        video.texture.baseTexture.destroy();
    };

    const selector = SelectorFactory(new Selector("What is zen, video"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    const factory = FlowComponentFactory(chapter, 'zendo4')
        .mergeMover(previous)
        .appendSelector(selector)
        .mergePixi(components);

    return factory.component;
};

