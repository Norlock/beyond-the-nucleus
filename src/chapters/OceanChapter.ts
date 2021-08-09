import { Chapter, ContainerData } from './base/Chapter'
import * as PIXI from 'pixi.js'
import { GetAudio } from 'src/modules/audio/GetAudio'
import { Selector } from 'src/modules/selector/Selector'
import { boardApp, pixiResources } from 'src/pixi/PixiApp'
import { PixiPlugin } from 'gsap/all'
import { gsap } from 'gsap'
import { ChapterFactory } from 'src/factories/ChapterFactory'
import { ChapterType } from './base/ChapterType'
import { SelectState } from 'src/modules/audio/AudioComponent'
import { Promiser } from 'src/utils/Promiser'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

enum OceanName {
    START = 'start',
    TURTLE = 'turtle',
    CORAL = 'coral'
}

enum AudioTag {
    AMBIENCE = 'ambience'
}

export const OceanChapter = (): Chapter => {
    const audio = GetAudio('src/assets/ocean/underwater-ambience.wav', true, 0.1)

    const background2 = getBackground2()
    const factory = ChapterFactory(ChapterType.OCEAN, 0, 0)
        .addContainer(getBackground1())
        .addContainer(background2)
        .addContainer(getBackground3(background2.container))
        .addAudio(audio, AudioTag.AMBIENCE)

    factory.chapter.selector.append(chapterSelector(factory.chapter))
    return factory.chapter
}

const getBackground1 = (): ContainerData => {
    const container = new PIXI.Container()
    const imageWidth = 3210
    const imageHeight = 2042
    const background = new PIXI.Sprite(pixiResources.oceanStart)

    const displacementWater = PIXI.Sprite.from('src/assets/ocean/displacement.png')
    displacementWater.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementWater)
    const scale = (boardApp.screen.width / 1920) * 12
    displacementWater.scale.set(scale)

    background.width = imageWidth
    background.height = imageHeight

    background.addChild(displacementWater)
    background.filters = [displacementFilter]
    container.addChild(background)

    const animateWater = (): void => {
        displacementWater.x = displacementWater.x + 1
        displacementWater.y = displacementWater.y + 1
    }

    const selector = new Selector('Displacement background 1')

    selector.activate = async () => {
        const promiser = Promiser<void>()
        setTimeout(() => {
            boardApp.ticker.add(animateWater)
            promiser.resolve()
        }, 200)

        return promiser.promise
    }

    selector.deactivate = async () => {
        boardApp.ticker.remove(animateWater)
    }

    return {
        container,
        name: OceanName.START,
        selector
    }
}

const getBackground2 = (): ContainerData => {
    const displacementWater = PIXI.Sprite.from('src/assets/ocean/displacement.png')

    displacementWater.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.MIRRORED_REPEAT
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementWater)
    displacementWater.scale.set(20)

    const container = new PIXI.Container()
    container.x = 2200
    container.y = 2200
    // Inner radius of the circle
    const radius = 1500

    // The blur amount
    const blurSize = 32

    const background = new PIXI.Sprite(pixiResources.oceanTurtle)
    background.width = 3975
    background.height = 2650

    const circle = new PIXI.Graphics()
        .beginFill(0xff0000)
        .drawCircle(radius + blurSize, radius + blurSize, radius)
        .endFill()
    circle.filters = [new PIXI.filters.BlurFilter(blurSize)]

    const bounds = new PIXI.Rectangle(0, 0, (radius + blurSize) * 2, (radius + blurSize) * 2)
    const texture = boardApp.renderer.generateTexture(circle, { scaleMode: PIXI.SCALE_MODES.NEAREST, region: bounds })
    const focus = new PIXI.Sprite(texture)
    focus.position.x = 0
    focus.position.y = 0

    container.addChild(focus)
    background.mask = focus

    background.addChild(displacementWater)
    background.filters = [displacementFilter]

    container.addChild(background)

    const animateWater = (): void => {
        displacementWater.x = displacementWater.x + 1
        displacementWater.y = displacementWater.y + 1
    }

    const bubbleSelector = bubbleAnimation(background)

    const selector = new Selector('Displacement background 1')
    selector.activate = async () => {
        boardApp.ticker.add(animateWater)
        bubbleSelector.activate()
    }

    selector.deactivate = async () => {
        boardApp.ticker.remove(animateWater)
        bubbleSelector.deactivate()
    }

    return {
        container,
        name: OceanName.TURTLE,
        selector
    }
}

const getBackground3 = (container2: PIXI.Container): ContainerData => {
    const container = new PIXI.Container()
    container.x = container2.x - boardApp.screen.width - 1000
    container.y = 2500

    let videoSprite: PIXI.Sprite

    const selector = new Selector('Coral video')
    selector.activate = async () => {
        const video = document.createElement('video')
        video.preload = 'auto'
        video.loop = true
        video.src = '/src/assets/ocean/coral.mp4'
        videoSprite = PIXI.Sprite.from(PIXI.Texture.from(video))
        videoSprite.width = boardApp.screen.width
        videoSprite.height = boardApp.screen.height
        container.addChild(videoSprite)
    }

    selector.deactivate = async () => {
        container.removeChild(videoSprite)
        videoSprite.texture.baseTexture.destroy()
    }

    return {
        container,
        name: OceanName.CORAL,
        selector
    }
}

const chapterSelector = (self: Chapter): Selector => {
    const selector = new Selector('Chapter audio')
    selector.activate = async () => {
        setTimeout(() => {
            self.audio.select(AudioTag.AMBIENCE, SelectState.fadeIn)
        }, 200)
    }

    selector.deactivate = async () => {
        self.audio.selected.fadeOut()
    }

    return selector
}

const bubbleAnimation = (background: PIXI.Container): Selector => {
    let scale = 0.4
    const bubbles: gsap.core.Timeline[] = []

    const selector = new Selector('Bubbles background 3')
    selector.activate = async () => {
        bubbles.forEach((bubble) => bubble.play())
    }

    selector.deactivate = async () => {
        bubbles.forEach((bubble) => bubble.pause())
    }

    for (let i = 0; i < 150; i++) {
        if (i % 20 === 0) {
            scale = 0.4
        }

        const bubble = PIXI.Sprite.from(pixiResources.oceanBubble)
        const offset = i * 5
        scale -= 0.01

        const bubbleContainer = new PIXI.Container()
        bubbleContainer.addChild(bubble)
        bubbleContainer.alpha = 0

        gsap.set([bubbleContainer], { x: 1100 + i, y: 3700 })
        gsap.set([bubble], { pixi: { anchor: 0.5, scale: scale } })

        background.addChild(bubbleContainer)

        bubbles.push(
            gsap
                .timeline({
                    defaults: {
                        ease: 'sine.inOut',
                        duration: 10 + scale * 100
                    },
                    repeat: -1,
                    repeatDelay: 0,
                    delay: Math.random() * 20,
                    yoyo: false
                })
                .to(bubbleContainer, { pixi: { x: 1550 + offset, y: 125, scale: 1.5, alpha: 0.6 } }, 1)
        )
    }

    return selector
}
