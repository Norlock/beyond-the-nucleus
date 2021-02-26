import { Chapter, ContainerData } from './base/Chapter';
import * as PIXI from 'pixi.js';
import { GetAudio } from 'src/modules/audio/GetAudio';
import { Selector } from 'src/modules/selector/Selector';
import { pixiApp, pixiResources } from 'src/pixi/PixiApp';
import { PixiPlugin } from 'gsap/all';
import { gsap } from 'gsap';
import { ChapterFactory } from 'src/factories/ChapterFactory';
import { ChapterType } from './base/ChapterType';
import { SelectState } from 'src/modules/audio/AudioComponent';
import { SelectorFactory } from 'src/factories/SelectorFactory';
import { Promiser } from 'src/utils/Promiser';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

export enum OceanName {
    START = 'start',
        TURTLE = 'turtle',
        CORAL = 'coral',
        OCEAN = 'ocean'
}

enum AudioTag {
    AMBIENCE = 'ambience'
}

export const OceanChapter = (): Chapter => {
    const factory = ChapterFactory(ChapterType.OCEAN, 0, 0);
    const audio = GetAudio('src/assets/ocean/underwater-ambience.wav', true, 0.1);

    const background2 = getBackground2();
    factory.addContainer(getBackground1())
        .addContainer(background2)
        .addContainer(getBackground3(background2.container))
        .appendSelector(chapterSelector(factory.chapter))
        .addAudio(audio, AudioTag.AMBIENCE);

    return factory.chapter;
};

const getBackground1 = (): ContainerData => {
    const container = new PIXI.Container();
    const imageWidth = 3210;
    const imageHeight = 2042;
    const background = new PIXI.Sprite(pixiResources.oceanStart);

    const displacementWater = PIXI.Sprite.from('src/assets/ocean/displacement.png');
    displacementWater.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementWater);
    const scale = (pixiApp.screen.width / 1920) * 12;
    displacementWater.scale.set(scale);

    background.width = imageWidth;
    background.height = imageHeight;

    background.addChild(displacementWater);
    background.filters = [displacementFilter];
    container.addChild(background);

    const animateWater = (): void => {
        displacementWater.x = displacementWater.x + 1;
        displacementWater.y = displacementWater.y + 1;
    };

    const select = async () => {
        const promiser = Promiser<void>();
        setTimeout(() => {
            pixiApp.ticker.add(animateWater);
            promiser.resolve();
        }, 200);

        return promiser.promise;
    };

    const unselect = async () => {
        pixiApp.ticker.remove(animateWater);
    };

    const selector = SelectorFactory(new Selector("Displacement background 1"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    return {
        container,
        name: OceanName.START,
        selector
    }
};

const getBackground2 = (): ContainerData => {
    const displacementWater = PIXI.Sprite.from('src/assets/ocean/displacement.png');

    displacementWater.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementWater);
    displacementWater.scale.set(20);

    const container = new PIXI.Container();
    container.x = 2200;
    container.y = 2200;
    // Inner radius of the circle
    const radius = 1500;

    // The blur amount
    const blurSize = 32;

    const background = new PIXI.Sprite(pixiResources.oceanTurtle);
    background.width = 3975;
    background.height = 2650;

    const circle = new PIXI.Graphics()
        .beginFill(0xff0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill();
    circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2);
    const texture = pixiApp.renderer.generateTexture(circle, PIXI.SCALE_MODES.NEAREST, 1, bounds);
    const focus = new PIXI.Sprite(texture);
    focus.position.x = 0;
    focus.position.y = 0;

    container.addChild(focus);
    background.mask = focus;

    background.addChild(displacementWater);
    background.filters = [displacementFilter];

    container.addChild(background);

    const animateWater = (): void => {
        displacementWater.x = displacementWater.x + 1;
        displacementWater.y = displacementWater.y + 1;
    };

    const bubbleSelector = bubbleAnimation(background);

    const select = async () => {
        pixiApp.ticker.add(animateWater);
        bubbleSelector.select();
    };

    const unselect = async () => {
        pixiApp.ticker.remove(animateWater);
        bubbleSelector.unselect();
    };

    const selector = SelectorFactory(new Selector("Displacement background 1"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    return { 
        container,
        name: OceanName.TURTLE,
        selector 
    }
};

const getBackground3 = (container2: PIXI.Container): ContainerData => {
    const container = new PIXI.Container();
    container.x = container2.x - pixiApp.screen.width - 1000;
    container.y = 2500;

    let videoSprite: PIXI.Sprite;

    const select = async () => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.loop = true;
        video.src = 'src/assets/ocean/Coral.mp4';
        videoSprite = PIXI.Sprite.from(PIXI.Texture.from(video));
        videoSprite.width = pixiApp.screen.width;
        videoSprite.height = pixiApp.screen.height;
        container.addChild(videoSprite);
    };

    const unselect = async () => {
        container.removeChild(videoSprite);
        videoSprite.texture.baseTexture.destroy()
    };

    const selector = SelectorFactory(new Selector("Coral video"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    return {
        container,
        name: OceanName.CORAL,
        selector
    }
};

const chapterSelector = (self: Chapter): Selector => {
    const select = async () => {
        setTimeout(() => {
            self.audio.select(AudioTag.AMBIENCE, SelectState.fadeIn);
        }, 200);
    };

    const unselect = async () => {
        self.audio.selected.fadeOut();
    };

    const selector = SelectorFactory(new Selector("Chapter audio"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();

    return selector;
};

const bubbleAnimation = (background: PIXI.Container): Selector => {
    let scale = 0.4;
    const bubbles: gsap.core.Timeline[] = []; 

    const select = async () => {
        bubbles.forEach(bubble => bubble.play());
    }

    const unselect = async () => {
        bubbles.forEach(bubble => bubble.pause());
    }

    for (let i = 0; i < 150; i++) {
        if (i % 20 === 0) {
            scale = 0.4;
        }

        const bubble = PIXI.Sprite.from(pixiResources.oceanBubble);
        const offset = i * 5;
        scale -= 0.01;

        const bubbleContainer = new PIXI.Container();
        bubbleContainer.addChild(bubble);
        bubbleContainer.alpha = 0;

        gsap.set([bubbleContainer], { x: 1100 + i, y: 3700 });
        gsap.set([bubble], { pixi: { anchor: 0.5, scale: scale } });

        background.addChild(bubbleContainer);

        bubbles.push(
            gsap.timeline({
                defaults: {
                    ease: 'sine.inOut',
                    duration: 10 + scale * 100
                },
                repeat: -1,
                repeatDelay: 0,
                delay: Math.random() * 20,
                yoyo: false,
            })
            .to(bubbleContainer, { pixi: { x: 1550 + offset, y: 125, scale: 1.5, alpha: 0.6 } }, 1));
    }

    return SelectorFactory(new Selector("Bubbles background 3"))
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};
