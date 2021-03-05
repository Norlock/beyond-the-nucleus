import * as PIXI from 'pixi.js';
import { CardOptions } from './Pixi';

export const cardColor = (cardAttr: CardOptions, color: number): PIXI.Container => {
    const { width, height, radius, borderColor, alpha } = cardAttr;

    return new PIXI.Graphics()
        .lineStyle(2, borderColor ?? 0x000000, 1)
        .beginFill(color ?? 0x000000, alpha ?? 1)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill();
};

export const cardImage = (cardAttr: CardOptions, image: PIXI.Texture): PIXI.Container => {
    const { width, height, radius, borderColor } = cardAttr;

    const component = new PIXI.Container()
    const imgSprite = new PIXI.Sprite(image);
    const graphic = new PIXI.Graphics()
        .lineStyle(2, borderColor, 1)
        .beginFill(0x000000)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill();

    imgSprite.addChild(graphic);
    imgSprite.mask = graphic;
    imgSprite.name = "mask";
    component.addChild(imgSprite);

    return component;
};

export const shadowCard = (background: CardOptions, elevate: number): PIXI.Graphics => {
    const shadow = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRoundedRect(elevate, elevate, background.width, background.height, background.radius)
        .endFill();

    shadow.filters = [new PIXI.filters.BlurFilter(5)];
    return shadow;
};

export interface Dimensions {
    width: number;
    height: number;
    x: number;
    y: number;
}

export const imageFrame = (imageTexture: PIXI.Texture, dimensions: Dimensions, borderWidth: number, filters?: PIXI.Filter[]): PIXI.Graphics => {
    const maskWidth = dimensions.width + (borderWidth * 2);
    const maskHeight = dimensions.height + (borderWidth * 2);

    imageTexture.baseTexture.setSize(dimensions.width, dimensions.height);
    const clone = imageTexture.clone();
    clone.updateUvs();

    const blurFilter = new PIXI.filters.ColorMatrixFilter();

    filters?.push(blurFilter);

    const image = PIXI.Sprite.from(clone);
    image.filters = filters;

    const frame = new PIXI.Graphics()
        .beginFill(0x000000)
        .drawRoundedRect(0, 0, maskWidth, maskHeight, 20)
        .endFill();

    const mask = new PIXI.Graphics()
        .beginFill(0xFFFFFF)
        .drawRoundedRect(0, 0, dimensions.width, dimensions.height, 20)
        .endFill();

    frame.x = dimensions.x;
    frame.y = dimensions.y;

    image.x = borderWidth;
    image.y = borderWidth;

    image.addChild(mask);
    image.mask = mask;

    frame.addChild(image);
    return frame;
}
