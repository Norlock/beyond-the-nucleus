import * as PIXI from 'pixi.js';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { TestFlags } from '../base/PartTester';
import { ZendoPart4 } from './ZendoPart4';
import { LINE_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles';

export class ZendoPart3 extends PartChain {
    constructor(previous: PartChain) {
        super("Zendo3", ChapterType.ZEN, previous)
    }

    buildComponent(factory: FlowComponentFactory): void {
        component(factory);
    }

    getNextParts(): PartChain[] {
        return [ new ZendoPart4(this) ];
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
        x: 800,
        y: 900,
        width: 400,
        height: 250,
        pivotCenter: false,
    };

    const header = new PIXI.Text('A great Indian sage', headerStyle());
    header.x = cardOptions.width / 2;
    header.y = 50;
    header.anchor.set(0.5);

    const paragraphText = 'Once said';
    const parStyle = paragraphStyle(cardOptions.width - 40);
    parStyle.dropShadow = false;
    parStyle.fill = ['#000'];
    parStyle.fontSize = 28;
    parStyle.strokeThickness = 1.5;
    const paragraph = new PIXI.Text(paragraphText, parStyle);
    paragraph.x = 20;
    paragraph.y = 80;

    const quoteText = 'The world is illusion. Only True Self is real. The world is True Self.';
    const quote = new PIXI.Text(quoteText, paragraphStyle(cardOptions.width - 40));
    quote.x = 20;
    quote.y = 120;

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, ZendoName.START)
        .setImageCard(zendoCardImage(cardOptions.width, cardOptions.height))
        .addChild(header, paragraph, quote)
        .setOffset(300, 200)
        .elevate(12)
        .build();

    factory.mergePixiCard(cardData.containerName, cardData.card);
};
