import * as PIXI from 'pixi.js';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { pixiResources } from 'src/pixi/PixiApp';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { TestFlags } from '../base/PartTester';
import { OceanPart4 } from './OceanPart4';
import { oceanStyles } from './OceanStyles';

export class OceanPart3 extends PartChain {
    constructor(previous: PartChain) {
        super("Ocean3", ChapterType.OCEAN, previous);
    }

    buildComponent(factory: FlowComponentFactory): void {
        component(factory);
    }

    attachPreviousComponent(factory: FlowComponentFactory, previous: FlowComponent): void {
        factory
            .mergePrevious(previous)
            .mergePixiLine(previous, oceanStyles.LINE_COLOR);
    }

    getNextParts(): PartChain[] {
        return [ new OceanPart4(this) ];
    }

    getTestFlags(standard: TestFlags): TestFlags {
        return standard;
    }
}

const component = (factory: FlowComponentFactory): void => {
    const width = 800;
    const leftX = 40;
    const rightX = width / 2;
    const topY = 40;

    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        x: 1700,
        y: 1300,
        width: width,
        height: 440,
        pivotCenter: false
    };

    const headerStyle = new PIXI.TextStyle({
        fontSize: 35,
        fontStyle: 'bold',
        fill: ['#FF00FF'], // gradient
        align: 'center',
        wordWrap: true,
        wordWrapWidth: cardOptions.width,
        lineJoin: 'round'
    });

    const header = new PIXI.Text('Anthozoa', headerStyle);
    header.x = leftX;
    header.y = topY;

    const columnWidth = width / 2 - leftX * 2;
    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 25,
        fill: ['#FFFFFF'], // gradient
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 2,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 2,
        wordWrap: true,
        wordWrapWidth: columnWidth,
        lineJoin: 'round'
    });

    // Adults are attached to the seabed, but their larvae are free-floating and can drift to new settlements (maybe
    // next component)
    const paragraphText =
        'The class Anthozoa includes corals, anemones, sea pens and seafans. Anthozoa consists of 10 orders and thousands of species.';
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = leftX;
    paragraph.y = 100;

    const image = PIXI.Sprite.from(pixiResources.oceanAnthozoa);
    image.y = topY;
    image.x = rightX;
    image.width = columnWidth + 40;
    image.height = columnWidth + 30;

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, OceanName.START)
        .setColorCard(0x000000)
        .addChild(header, paragraph, image)
        .setOffset(400, 200)
        .build();

    factory.mergePixiCard(cardData.containerName, cardData.card)
};
