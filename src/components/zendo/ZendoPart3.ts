import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { ZendoName } from 'src/chapters/ZendoChapter';
import { FlowComponentFactory } from 'src/factories/FlowComponentFactory';
import { PixiCardFactory } from 'src/factories/PixiCardFactory';
import { CardOptions } from 'src/modules/pixi/Pixi';
import { FlowComponent } from '../base/FlowComponent';
import { PartChain } from '../base/PartChain';
import { ZendoPart4 } from './ZendoPart4';
import { BEZIER_COLOR, headerStyle, paragraphStyle, zendoCardImage } from './ZendoStyles';

export class ZendoPart3 extends PartChain {
    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [
            new ZendoPart4(chapter, partToLink)
        ];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
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

    const components = PixiCardFactory(cardOptions, chapter, ZendoName.START)
        .setImageCard(zendoCardImage(cardOptions.width, cardOptions.height))
        .addChild(header, paragraph, quote)
        .setOffset(300, 200)
        .elevate(12)
        .setLine(previous, BEZIER_COLOR)
        .build();

    const factory = FlowComponentFactory(chapter, 'zendo3')
        .mergeMover(previous)
        .mergePixi(components);

    return factory.component;
};
