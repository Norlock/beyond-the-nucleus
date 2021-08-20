import * as PIXI from 'pixi.js'
import { CardOptions } from './Pixi'

export const cardColor = (cardAttr: CardOptions, color: number): PIXI.Container => {
    const { width, height, radius, borderColor, alpha } = cardAttr

    return new PIXI.Graphics()
        .lineStyle(2, borderColor ?? 0x000000, 1)
        .beginFill(color ?? 0x000000, alpha ?? 1)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill()
}

export const cardImage = (cardAttr: CardOptions, image: PIXI.Texture): PIXI.Container => {
    const { width, height, radius, borderColor } = cardAttr

    const component = new PIXI.Container()
    const imgSprite = new PIXI.Sprite(image)
    const graphic = new PIXI.Graphics()
        .lineStyle(2, borderColor, 1)
        .beginFill(0x000000)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill()

    imgSprite.addChild(graphic)
    imgSprite.mask = graphic
    imgSprite.name = 'mask'
    component.addChild(imgSprite)

    return component
}

export const shadowCard = (background: CardOptions, elevate: number): PIXI.Graphics => {
    const shadow = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRoundedRect(elevate, elevate, background.width, background.height, background.radius)
        .endFill()

    shadow.filters = [new PIXI.filters.BlurFilter(5)]
    return shadow
}

export interface Dimensions {
    width: number
    height: number
    x: number
    y: number
}

export const imageFrame = (
    imageUrl: string,
    dimensions: Dimensions,
    borderWidth: number,
    filters?: PIXI.Filter[]
): PIXI.Sprite => {
    const frameWidth = dimensions.width + borderWidth * 2
    const frameHeight = dimensions.height + borderWidth * 2

    //const colorFilter = new PIXI.filters.ColorMatrixFilter()

    //filters?.push(colorFilter)

    const image = PIXI.Sprite.from(imageUrl)
    image.filters = filters
    image.x = dimensions.x
    image.y = dimensions.y
    image.width = frameWidth
    image.height = frameHeight

    const frame = new PIXI.Graphics().beginFill(0xffffff).drawRoundedRect(0, 0, frameWidth, frameHeight, 20).endFill()
    frame.x = 5
    frame.y = 5

    image.addChild(frame)
    image.mask = frame
    return image
}
