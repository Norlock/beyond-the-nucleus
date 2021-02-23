import * as PIXI from 'pixi.js';
import { Chapter } from "src/chapters/base/Chapter";
import { ZendoName } from "src/chapters/ZendoChapter";
import { FlowComponentFactory } from "src/factories/FlowComponentFactory";
import { PixiCardFactory } from "src/factories/PixiCardFactory";
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { CardOptions } from "src/modules/pixi/Pixi";
import { Selector } from 'src/modules/selector/Selector';
import { pixiApp } from 'src/pixi/PixiApp';
import { FlowComponent } from "../base/FlowComponent";
import { PartChain } from "../base/PartChain";
import { BEZIER_COLOR, headerStyle, zendoCardImage } from "./ZendoStyles";

export class ZendoPart5 extends PartChain {

    buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent {
        return component(chapter, previous);
    }

    getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[] {
        return [];
    }
}

const component = (chapter: Chapter, previous: FlowComponent): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 3200,
        y: 400,
        width: 400,
        height: 250,
        pivotCenter: false,
    };

    const hdStyle = headerStyle();
    hdStyle.fontSize = 42;
    hdStyle.fill = '#777'
    const header = new PIXI.Text('Zazen', hdStyle);
    header.x = cardOptions.width / 2;
    header.y = 50;
    header.anchor.set(0.5);

    const paragraphText = "Also known as sitting meditation.";
    const paragraphStyle = new PIXI.TextStyle({
        fontSize: 32,
        fontFamily: 'Monaco',
        fill: '#DDD',
        stroke: '#000',
        strokeThickness: 1,
        dropShadow: true,
        dropShadowColor: '#000',
        dropShadowDistance: 2,
        dropShadowBlur: 2,
        letterSpacing: 1.5,
        wordWrap: true,
        wordWrapWidth: 250
    });

    const paragraph = new PIXI.Text(paragraphText, paragraphStyle);
    paragraph.x = 30;
    paragraph.y = 90;

    const components = PixiCardFactory(cardOptions, chapter, ZendoName.START)
        .setImageCard(zendoCardImage(cardOptions.width, cardOptions.height))
        .addChild(header, paragraph, logo())
        .setOffset(150, 150)
        .elevate(12)
        .setLine(previous, BEZIER_COLOR)
        .build();

    const factory = FlowComponentFactory(chapter, 'zendo5');
    factory
        .mergeMover(previous)
        .mergePixi(components)
        .appendSelector(selector(factory.component));

    return factory.component;
};

const logo = (): PIXI.Container => {
    const buddhaLogo = PIXI.Sprite.from('src/assets/zendo/Buddha-logo.png');
    buddhaLogo.x = 250;
    buddhaLogo.y  = 72;
    buddhaLogo.width = 125;
    buddhaLogo.height = 150;

    const buddhaLogoShadow =  PIXI.Sprite.from(buddhaLogo.texture.clone());
    buddhaLogoShadow.x = 255;
    buddhaLogoShadow.y  = 76;
    buddhaLogoShadow.width = 125;
    buddhaLogoShadow.height = 150;

    const filter = new PIXI.filters.ColorMatrixFilter();
    filter.negative(true);

    const filter2 = new PIXI.filters.ColorMatrixFilter();
    const filter3 = new PIXI.filters.NoiseFilter();

    filter3.noise = 0.6;
    filter2.brightness(0.1, true);

    buddhaLogo.filters = [ filter, filter3, filter2 ]

    const container = new PIXI.Container();
    container.addChild(buddhaLogoShadow, buddhaLogo);
    return container;
}

const selector = (component: FlowComponent): Selector => {
    const { root } = component.chapter;
    const { card } = component.pixi;

    const outer = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRoundedRect(0, 0, 410, 542, 20)
        .endFill();

    outer.x = card.x + card.width + 300;
    outer.y = card.y - 100;

    const graphic = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRoundedRect(0, 0, 600, 800, 20)
        .endFill();

    const zazenSprite = PIXI.Sprite.from('src/assets/zendo/zazen.jpg');
    zazenSprite.addChild(graphic);
    zazenSprite.mask = graphic;
    zazenSprite.x = 5;
    zazenSprite.y = 5;
    zazenSprite.width = 400;
    zazenSprite.height = 532;
    
    outer.addChild(zazenSprite);
    outer.alpha = 0;

    const animate = (resolve: Function): void => {
        outer.alpha += 0.01;

        if (outer.alpha === 1) {
            pixiApp.ticker.remove(animate);
            resolve();
        }
    }

    const select = async (): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(() => pixiApp.ticker.add(() => animate(resolve)), 2000)
            root.addChild(outer);
        });
    }

    const unselect = async () => {
        outer.alpha = 0;
        root.removeChild(outer);
    }
    
    return SelectorFactory(new Selector("Zazen image part 5"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();
}

