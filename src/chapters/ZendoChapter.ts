import * as PIXI from 'pixi.js';
import { ChapterFactory } from 'src/factories/ChapterFactory';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { SelectState } from 'src/modules/audio/AudioComponent';
import { GetAudio } from 'src/modules/audio/GetAudio';
import { Selector } from 'src/modules/selector/Selector';
import { boardApp } from 'src/pixi/PixiApp';
import { Chapter, ContainerData } from './base/Chapter';
import { ChapterType } from './base/ChapterType';

enum AudioTag {
    INTRO = 'intro'
}

export enum ZendoName {
    START = 'start'
}

const blurSize = 10;
const blurfilterLeft = new PIXI.filters.BlurFilter(blurSize);
const blurfilterRight = new PIXI.filters.BlurFilter(blurSize);

export const ZendoChapter = (): Chapter => {
    //const intro = GetAudio('src/assets/zendo/bell.wav', false, 0.2);
    const intro = GetAudio('src/assets/zendo/bell.wav', false, 0);
    //const factory = ChapterFactory(ChapterType.ZEN, 7000, 7000, "Zendo")
    const factory = ChapterFactory(ChapterType.ZEN, 0, 0, "Zendo")
        .addContainer(background1())
        .addAudio(intro, AudioTag.INTRO);

    factory.appendSelector(selector(factory.chapter));

    return factory.chapter;
};

const background1 = (): ContainerData => {
    const container = new PIXI.Container();
    const left = PIXI.Sprite.from('src/assets/zendo/zendo-left.jpg');
    left.width = 4856;
    left.height = 3238;
    left.filters = [blurfilterLeft];

    const right = PIXI.Sprite.from('src/assets/zendo/zendo-right.jpg');
    right.width = 5857;
    right.height = 3905;
    right.x = 4856 + 50;
    right.filters = [blurfilterRight];

    container.addChild(left, right);

    return {
        container,
        name: ZendoName.START
    }
};

const selector = (self: Chapter): Selector => {
    const doAnimate = (resolve: Function) => {
        const animate = (): void => {
            if (blurfilterLeft.blur > 0) {
                blurfilterLeft.blur -= 0.1;
                blurfilterRight.blur -= 0.1;
            } else {
                boardApp.ticker.remove(animate);
                resolve();
            }
        };

        setTimeout(() => {
            boardApp.ticker.add(animate);
        }, 500);
    }

    const select = async () => {
        blurfilterLeft.blur = blurSize;
        blurfilterRight.blur = blurSize;

        self.audio.select(AudioTag.INTRO, SelectState.play, 5000);
        return new Promise<void>(resolve => doAnimate(resolve));
    };

    const unselect = async () => {
        self.audio.stop();
    };

    return SelectorFactory(new Selector("Blur Zendo intro"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};
