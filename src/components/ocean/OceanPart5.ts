import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { OceanName } from 'src/chapters/OceanChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiFactory } from 'src/factories/PixiFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { OceanPart6 } from './OceanPart6';

export class OceanPart5 extends PartChain {
    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [
            new OceanPart6(chapter, partToLink)
        ];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
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

    const components = PixiFactory(cardOptions, chapter, OceanName.TURTLE)
        .setColorCard(0x000000)
        .addChild(header, paragraph)
        .setOffset(600, 200)
        .setBezier(previous, 0xFFFFFF)
        .build();

    const factory = FlowComponentFactory(chapter, 'ocean5')
        .mergeMover(previous)
        .mergePixi(components);

    return factory.component;
};
