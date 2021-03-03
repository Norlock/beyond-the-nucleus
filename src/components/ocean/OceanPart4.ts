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
import { OceanPart5 } from './OceanPart5';
import { oceanStyles } from './OceanStyles';

export class OceanPart4 extends PartChain {
    constructor(previous: PartChain) {
        super("Ocean4", ChapterType.OCEAN, previous);
    }

    buildComponent(chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent {
        return component(chapter, previous, tag);
    }

    getNextParts(): PartChain[] {
        return [ new OceanPart5(this) ];
    }

    getTestFlags(standard: TestFlags): TestFlags {
        return standard;
    }
}

const component = (chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        x: 800,
        y: 1300,
        width: 400,
        height: 150,
        pivotCenter: false
    };

    const headerStyle = new PIXI.TextStyle({
        fontSize: 30,
        fill: ['#44aaff'], 
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    });

    const header = new PIXI.Text('Life in the ocean', headerStyle);
    header.x = 20;
    header.y = 20;

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 22,
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

    const paragraphText = 'The oceans harbor 99% of all living space on Earth';
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = 20;
    paragraph.y = 65;

    const pixiParams = PixiCardFactory(cardOptions, chapter, OceanName.TURTLE)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(600, 150)
        .setLine(previous, oceanStyles.LINE_COLOR)
        .build();

    return FlowComponentFactory(chapter, tag)
        .mergeMover(previous)
        .mergePixi(pixiParams)
        .build();
};
