import * as PIXI from 'pixi.js';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PartChainFactory } from 'src/factories/PartChainFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { defaultTestFlags, TestFlags } from '../base/PartTester';
import { OceanPart3 } from './OceanPart3';
import { oceanStyles } from './OceanStyles';

export const OceanPart2 = (previous: PartChain): PartChain => {
    const part = PartChainFactory("Ocean2", ChapterType.OCEAN, previous)
        .setBuildComponent(component)
        .setAttachPreviousComponent(attachPreviousComponent)
        .setTestFlags(testFlags())
        .build();

    part.nextParts = [ OceanPart3(part) ];
    return part;
}

const testFlags = (): TestFlags  => {
    const standard = defaultTestFlags();
    standard.hasPrevious = false;
    standard.hasLine = false;
    return standard;
}

const attachPreviousComponent = (factory: FlowComponentFactory, previous: FlowComponent): void => {
    factory
    .mergePrevious(previous)
    .mergePixiLine(previous, oceanStyles.LINE_COLOR);
}

const component = (factory: FlowComponentFactory): FlowComponent => {
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

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, OceanName.START)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(400, 300)
        .build();

    return factory
            .mergePixiCard(cardData.containerName, cardData.card)
            .component;
};
