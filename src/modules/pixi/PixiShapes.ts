import { Container, filters, Graphics, Point, Sprite, Texture } from 'pixi.js';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { pixiApp } from 'src/pixi/PixiApp';
import { CardOptions } from './Pixi';

export const cardColor = (cardAttr: CardOptions, color: number): Container => {
    const { width, height, radius, borderColor, alpha } = cardAttr;

    return new Graphics()
        .lineStyle(2, borderColor ?? 0x000000, 1)
        .beginFill(color ?? 0x000000, alpha ?? 1)
        .drawRoundedRect(0, 0, width, height, radius)
        .endFill();
};

export const cardImage = (cardAttr: CardOptions, image: Texture): Container => {
    const { width, height, radius, borderColor } = cardAttr;

    const component = new Container()
    const imgSprite = new Sprite(image);
    const graphic = new Graphics()
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

export const shadowCard = (background: CardOptions, elevate: number): Graphics => {
    const shadow = new Graphics()
        .beginFill(0x000000)
        .drawRoundedRect(elevate, elevate, background.width, background.height, background.radius)
        .endFill();

    shadow.filters = [new filters.BlurFilter(5)];
    return shadow;
};

const getCenter = (dimensions: Dimensions): Point => {
    const { width, height, x, y } = dimensions;
    const newX = x + (width / 2)
    const newY = y + (height / 2)
    return new Point(newX, newY)
}

export interface Dimensions {
    width: number;
    height: number;
    x: number;
    y: number;
}

export const drawBezier = (previous: FlowComponent, dimensions: Dimensions, color: number): Container => {
    const centerStart = getCenter(dimensions);
    const centerEnd = getCenter(previous.pixi.components.card);
    
    const endX = centerEnd.x - centerStart.x
    const endY = centerEnd.y - centerStart.y

    const bezier = new Graphics();

    let count = 0;
    const bezierY1 = (): number => {
        return endY / 4 - 300 + (10 * Math.sin(count))
    }

    const bezierX1 = (): number => {
        return endX / 4 + (20 * Math.sin(count))
    }

    const bezierY2 = (): number => {
        return endY / 4 + 300 + (10 * Math.sin(count))
    }

    const bezierX2 = (): number => {
        return endX / 2 + (20 * Math.sin(count))
    }

    const animate = () => {
        count += 0.03;
        bezier
            .clear()
            .lineTextureStyle({ 
                width: 4,
                color
            })
            .bezierCurveTo(bezierX1(), bezierY1(), bezierX2(), bezierY2(), endX, endY);
    }
    pixiApp.ticker.add(animate);
    
    bezier.position.set(centerStart.x, centerStart.y);
    bezier.visible = false;

    return bezier;
}
