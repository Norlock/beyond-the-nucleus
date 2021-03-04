import * as PIXI from 'pixi.js';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { TestFlags } from '../base/PartTester';
import { ZendoPart1 } from '../zendo/ZendoPart1';

export class OceanPart6 extends PartChain {
    constructor(previous: PartChain) {
        super("Ocean6", ChapterType.OCEAN, previous);
    }

    buildComponent(factory: FlowComponentFactory): void {
        component(factory);
    }

    getNextParts(): PartChain[] {
        return [ new ZendoPart1(this) ];
    }

    attachPreviousComponent(factory: FlowComponentFactory, previous: FlowComponent): void {
        factory.mergePrevious(previous);
    }
    
    getTestFlags(standard: TestFlags): TestFlags {
        standard.hasLine = false;
        return standard;
    }
}

const component = (factory: FlowComponentFactory): void => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        alpha: 1,
        x: 100,
        y: 100,
        width: 530,
        height: 180,
        pivotCenter: false
    };

    const headerStyle = new PIXI.TextStyle({
        fontSize: 33,
        fontStyle: 'bold',
        fill: ['#44aaff'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    });

    const header = new PIXI.Text('The Rainforests of the Sea', headerStyle);
    header.x = cardOptions.width / 2;
    header.y = 40;
    header.anchor.set(0.5);

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

    const paragraphText = 'Coral reefs are the largest structures on earth of biological origin.';
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = 20;
    paragraph.y = 75;

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, OceanName.CORAL)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(100, 100)
        .build();

    factory.mergePixiCard(cardData.containerName, cardData.card);
};
