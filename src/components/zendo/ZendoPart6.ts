import * as PIXI from 'pixi.js';
import { ChapterType } from "src/chapters/base/ChapterType";
import {ZendoName} from "src/chapters/ZendoChapter";
import {GameComponentFactory} from "src/factories/GameComponentFactory";
import {PartChainFactory} from "src/factories/PartChainFactory";
import {PixiCardFactory} from "src/factories/PixiCardFactory";
import {kungfuLoader} from 'src/games/kungfu/KungfuLoader';
import {LoaderType} from "src/modules/partChain/PartLoader";
import {CardOptions} from "src/modules/pixi/Pixi";
import { FlowComponent } from "../base/FlowComponent";
import { PartChain } from "../base/PartChain";
import { defaultTestFlags } from "../base/PartTester";
import {headerStyle, paragraphStyle, zendoCardImage} from "./ZendoStyles";
import {kungfuResources} from "src/games/kungfu/KungfuResources";
import {kungfuInputHandler} from 'src/games/kungfu/KungfuInputHandler';

export const ZendoPart6 = (previous: PartChain): PartChain => {
    return PartChainFactory("Kungfu", ChapterType.ZEN, previous)
        .mergeLoader(LoaderType.GAME, component, attachPreviousComponent)
        .setTestFlags(defaultTestFlags())
        .build();
}

const attachPreviousComponent = (factory: GameComponentFactory, previous: FlowComponent): void => {
    factory.mergePrevious(previous);
}

const component = (factory: GameComponentFactory): FlowComponent => {
    const cardOptions: CardOptions = {
        borderColor: 0x200900,
        alpha: 1,
        x: 6000,
        y: 500,
        width: 400,
        height: 400,
        pivotCenter: false,
    };

    const header = new PIXI.Text('Kungfu fighters!', headerStyle());
    header.x = cardOptions.width / 2;
    header.y = 40;
    header.anchor.set(0.5);

    const paragraphText = 'Defeat the enemies and make sure to avoid getting hit';
    const paragraph = new PIXI.Text(paragraphText, paragraphStyle(cardOptions.width - 40));
    paragraph.x = 20;
    paragraph.y = 75;

    const kungfuLogo = PIXI.Sprite.from('src/assets/zendo/kungfu/kungfu-icon.jpg');
    kungfuLogo.width = 100;
    kungfuLogo.height = 100;
    kungfuLogo.x = 100;
    kungfuLogo.y = 100;
    kungfuLogo.anchor.set(0.5);

    const logoContainer = new PIXI.Graphics()
        .lineStyle(2, 0x000000, 1)
        .beginFill(0xffffff)
        .drawCircle(100, 100, 80)
        .endFill();

    logoContainer.addChild(kungfuLogo);
    logoContainer.x = 100;
    logoContainer.y = 150;

    const cardData = PixiCardFactory(cardOptions, factory.component.chapter, ZendoName.START)
        .setImageCard(zendoCardImage(400, 400))
        .addChild(header, paragraph, logoContainer)
        .setOffset(150, 130)
        .elevate(12)
        .build();

    return factory
        .mergePixiCard(cardData.containerName, cardData.card)
        .mergeGameLoader(kungfuLoader(factory.component))
        .mergeResources(kungfuResources(factory.component))
        .mergeInputHandler(kungfuInputHandler(factory.component))
        .component;
}
