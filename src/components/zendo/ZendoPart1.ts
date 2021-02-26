import * as PIXI from 'pixi.js';
import { ZendoChapter, ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { CustomPixiCardFactory } from 'src/factories/CustomPixiCardFactory';
import { pixiApp } from 'src/pixi/PixiApp';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { Chapter } from 'src/chapters/base/Chapter';
import { ZendoPart2 } from './ZendoPart2';

export class ZendoPart1 extends PartChain {
    constructor(previous: PartChain) {
        super(ZendoChapter(), previous)
    }

    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [
            new ZendoPart2(chapter, partToLink)
        ];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
    const background = chapter.getContainer(ZendoName.START);
    const left = background.getChildAt(0) as PIXI.Sprite;

    const radius = 288;
    const blurSize = 25;

    const container = new PIXI.Container();
    container.x = (left.width + 25) - radius;
    container.y = (left.height / 2) - radius;

    const outerCircle = new PIXI.Graphics()
        .lineStyle(2, 0xb00023, 1)
        .beginFill(0x000000)
        .drawCircle(radius + blurSize, radius + blurSize, radius + blurSize)
        .endFill();

    outerCircle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    const circle = new PIXI.Graphics()
        .lineStyle(2, 0xb00023, 1)
        .beginFill(0x000000)
        .drawCircle(radius, radius, radius)
        .endFill();

    circle.x = circle.y = blurSize;

    container.addChild(outerCircle, circle);

    const headerStyle = new PIXI.TextStyle({
        fontSize: 72,
        fill: ['#765432'],
        fontFamily: 'Monaco',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: radius,
        lineJoin: 'round'
    });

    const header = new PIXI.Text('Zendo', headerStyle);
    header.x = radius;
    header.y = 135;
    header.anchor.set(0.5, 0);

    const paragraghStyle = new PIXI.TextStyle({
        fontSize: 36,
        fill: ['#FFEFCF'],
        fontFamily: 'Monaco',
        wordWrap: true,
        wordWrapWidth: radius * 2 - 100,
        lineJoin: 'round'
    });

    const paragraphText = '"Do not look for a sanctuary in anyone except your self."';
    const paragraph = new PIXI.Text(paragraphText, paragraghStyle);
    paragraph.x = 80;
    paragraph.y = radius - 30;

    const paragraphText2 = '- Buddha';
    const paragraph2 = new PIXI.Text(paragraphText2, paragraghStyle);
    paragraph2.x = radius;
    paragraph2.y = radius + 80;
    paragraph2.anchor.set(0.5, 0);

    const components = CustomPixiCardFactory(background, ZendoName.START)
        .setCard(container)
        .addChild(header, paragraph, paragraph2)
        .setOffset(pixiApp.screen.width / 2 - radius, pixiApp.screen.height / 2 - radius)
        .build();

    return FlowComponentFactory(chapter, 'zendo1')
        .mergeMover(previous)
        .mergePixi(components)
        .build();
};
