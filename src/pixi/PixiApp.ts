import * as PIXI from 'pixi.js'
import { Promiser } from 'src/utils/Promiser'

export const boardApp = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    antialias: true
})

export let pixiResources: resourceNames

interface resourceNames {
    oceanStart: PIXI.Texture
    oceanTurtle: PIXI.Texture
    oceanBubble: PIXI.Texture
    oceanAnthozoa: PIXI.Texture
    zendoCard: PIXI.Texture
}

export const preload = (): Promise<void> => {
    boardApp.loader.baseUrl = 'src/assets'
    boardApp.loader
        .add('oceanStart', 'ocean/ocean.jpg')
        .add('oceanTurtle', 'ocean/ocean-turtle.jpg')
        .add('oceanBubble', 'ocean/bubble.png')
        .add('oceanAnthozoa', 'ocean/Anthozoa.jpg')
        .add('zendoCard', 'zendo/card-background.jpg')

    boardApp.loader.onError.add((err: any) => console.error(err))

    const promiser = Promiser<void>()
    boardApp.loader.load((loader, res) => {
        pixiResources = {
            oceanBubble: res.oceanBubble.texture,
            oceanStart: res.oceanStart.texture,
            oceanTurtle: res.oceanTurtle.texture,
            oceanAnthozoa: res.oceanAnthozoa.texture,
            zendoCard: res.zendoCard.texture
        }
        promiser.resolve()
    })
    return promiser.promise
}

export const boardScroll = (direction: string) => {
    switch (direction) {
        case 'left':
            boardApp.stage.x += 20
            break
        case 'right':
            boardApp.stage.x -= 20
            break
        case 'up':
            boardApp.stage.y += 20
            break
        case 'down':
            boardApp.stage.y -= 20
            break
    }
}

export const isInViewport = (container: PIXI.Container): boolean => {
    const minX = container.x
    const minY = container.y
    const maxX = minX + container.width
    const maxY = minY + container.height

    return minX < boardApp.stage.x && boardApp.stage.x < maxX && minY < boardApp.stage.y && boardApp.stage.y < maxY
}
