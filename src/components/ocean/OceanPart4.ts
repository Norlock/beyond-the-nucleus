import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiFactory } from 'src/factories/PixiFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { OceanPart5 } from './OceanPart5';

export class OceanPart4 extends PartChain {
    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [
            new OceanPart5(chapter, partToLink)
        ];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
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

    const pixiParams = PixiFactory(cardOptions, chapter, OceanName.TURTLE)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(600, 150)
        .setBezier(previous, 0xFFFFFF)
        .build();

    const factory = FlowComponentFactory(chapter, 'ocean4')
        .mergeMover(previous)
        .mergePixi(pixiParams);

    return factory.component;
};
