import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { TestFlags } from '../base/PartTester';
import { OceanPart3 } from './OceanPart3';
import { oceanStyles } from './OceanStyles';

export class OceanPart2 extends PartChain {
    constructor(previous: PartChain) {
        super("Ocean2", ChapterType.OCEAN, previous);
    }

    buildComponent(chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent {
        return component(chapter, previous, tag);
    }

    getNextParts(): PartChain[] {
        return [ new OceanPart3(this) ]
    }

    getTestFlags(standard: TestFlags): TestFlags {
        return standard;
    }
}

const component = (chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        alpha: 1,
        x: 1500,
        y: 600,
        width: 450,
        height: 220,
        pivotCenter: false
    };

    const headerStyle = new PIXI.TextStyle({
        fontSize: 35,
        fontStyle: 'bold',
        fill: ['#44aaff'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    });

    const header = new PIXI.Text('The Ancient life', headerStyle);
    header.x = 30;
    header.y = 30;

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 25,
        fill: ['#FFFFFF'], // gradient
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: cardOptions.width - 40,
        lineJoin: 'round'
    });

    const paragraphText =
        'Which lasted from 541 until 252 million years ago,' +
        ' was a time of great change on Earth.';

    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = 30;
    paragraph.y = 80;

    const components = PixiCardFactory(cardOptions, chapter, OceanName.START)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(400, 300)
        .setLine(previous, oceanStyles.LINE_COLOR)
        .build();

    return FlowComponentFactory(chapter, tag)
        .mergeMover(previous)
        .mergePixi(components)
        .build();
};
