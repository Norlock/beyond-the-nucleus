import * as PIXI from 'pixi.js';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { TestFlags } from '../base/PartTester';
import { ZendoPart3 } from './ZendoPart3';
import { LINE_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles';

export class ZendoPart2 extends PartChain {
    constructor(previous: PartChain) {
        super("Zendo2", ChapterType.ZEN, previous)
    }

    buildComponent(factory: FlowComponentFactory): void {
        component(factory);
    }

    getNextParts(): PartChain[] {
        return [ new ZendoPart3(this) ];
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

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, ZendoName.START)
        .setImageCard(zendoCardImage(400, 180))
        .addChild(header, paragraph)
        .setOffset(300, 200)
        .elevate(12)
        .build();

    factory.mergePixiCard(cardData.containerName, cardData.card);
};
