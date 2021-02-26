import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { ZendoPart3 } from './ZendoPart3';
import { BEZIER_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles';

export class ZendoPart2 extends PartChain {
    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [
            new ZendoPart3(chapter, partToLink)
        ];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 1400,
        y: 200,
        width: 400,
        height: 180,
        pivotCenter: false,
    };

    const header = new PIXI.Text('Zendō', headerStyle());
    header.x = cardOptions.width / 2;
    header.y = 40;
    header.anchor.set(0.5);

    const paragraphText = 'Is a Japanese meditation hall where zazen is practiced';
    const paragraph = new PIXI.Text(paragraphText, paragraphStyle(cardOptions.width - 40));
    paragraph.x = 20;
    paragraph.y = 75;

    const components = PixiCardFactory(cardOptions, chapter, ZendoName.START)
        .setImageCard(zendoCardImage(400, 180))
        .addChild(header, paragraph)
        .setOffset(300, 200)
        .elevate(12)
        .setLine(previous, BEZIER_COLOR)
        .build();

    return FlowComponentFactory(chapter, 'zendo2')
        .mergeMover(previous)
        .mergePixi(components)
        .build();
};
