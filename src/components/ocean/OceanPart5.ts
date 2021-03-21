import * as PIXI from 'pixi.js';
import { ChapterType } from 'src/chapters/base/ChapterType';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PartChainFactory } from 'src/factories/PartChainFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import {LoaderType} from 'src/modules/partChain/PartLoader';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { defaultTestFlags } from '../base/PartTester';
import { OceanPart6 } from './OceanPart6';
import { oceanStyles } from './OceanStyles';

export const OceanPart5 = (previous: PartChain): PartChain => {
    return PartChainFactory("Ocean5", ChapterType.OCEAN, previous)
        .mergeLoader(LoaderType.FLOW, component, attachPreviousComponent)
        .setTestFlags(defaultTestFlags())
        .setNextParts(OceanPart6)
        .build();
}

const attachPreviousComponent = (factory: FlowComponentFactory, previous: FlowComponent): void => {
    factory
        .mergePrevious(previous)
        .mergePixiLine(previous, oceanStyles.LINE_COLOR);
}

const component = (factory: FlowComponentFactory): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x44aaff,
        x: 1700,
        y: 700,
        width: 500,
        height: 200,
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

    const header = new PIXI.Text('Photic zone', headerStyle);
    header.x = 20;
    header.y = 20;

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 22,
        fill: ['#FFFFFF'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
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
        'In the photic zone, the photosynthesis rate exceeds the respiration rate. This is due to the abundant solar energy.';
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = 20;
    paragraph.y = 65;

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, OceanName.TURTLE)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(600, 200)
        .build();

    return factory.mergePixiCard(cardData.containerName, cardData.card)
        .component;
};
