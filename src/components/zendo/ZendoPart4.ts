import { Chapter } from 'src/chapters/base/Chapter';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiFactory } from 'src/factories/PixiFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
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
        width: 0,
        height: 0,
        pivotCenter: false,
    };

    const offsetX = (pixiApp.screen.width / 2) 
    const offsetY = (pixiApp.screen.height / 2) 

    const components = PixiFactory(cardOptions, chapter, ZendoName.START)
        .setColorCard(0x000000)
        .setOffset(offsetX, offsetY)
        .build();

    const factory = FlowComponentFactory(chapter, 'zendo4')
        .mergeMover(previous)
        .mergePixi(components);

    //const videoPart = ZendoVideoPart1(chapter, factory.component);
    //factory.appendSelector(videoPart.selector);

    return factory.component;
};
