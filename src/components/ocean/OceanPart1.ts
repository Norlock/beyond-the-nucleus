import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { OceanChapter, OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiFactory } from 'src/factories/PixiFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { OceanPart2 } from './OceanPart2';

export class OceanPart1 extends PartChain {
    constructor() {
        super(OceanChapter(), undefined);
    }

    buildComponent(chapter: Chapter): FlowComponent {
        return component(chapter);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [ new OceanPart2(chapter, partToLink) ];
    }
}

const component = (chapter: Chapter): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        alpha: 1,
        x: 200,
        y: 200,
        width: 400,
        height: 190,
        pivotCenter: false,
    };

    const headerStyle = new PIXI.TextStyle({
        fontSize: 35,
        fontStyle: 'bold',
        fill: ['#44aaee'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    });

    const header = new PIXI.Text('The Ocean', headerStyle);
    header.x = 30
    header.y = 25;

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 25,
        fill: ['#FFFFFF'], // gradient
        wordWrap: true,
        wordWrapWidth: cardOptions.width - 40,
        lineJoin: 'round'
    });

    const paragraphText =
        'All live came from the ocean around 3.5 billion years ago.';
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = 30;
    paragraph.y = 80;

    const components = PixiFactory(cardOptions, chapter, OceanName.START)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(200, 200)
        .build();

    const factory = FlowComponentFactory(chapter, 'ocean1')
        .mergeMover(undefined)
        .mergePixi(components);

    return factory.component;
};
