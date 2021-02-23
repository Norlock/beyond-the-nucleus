import { Container, DisplayObject, Point, Texture } from "pixi.js"
import { Chapter } from "src/chapters/base/Chapter";
import { FlowComponent } from "src/components/base/FlowComponent";
import { ComponentCardSelector } from "src/modules/pixi/ComponentCard";
import { ComponentLineSelector } from "src/modules/pixi/ComponentLine";
import { CardOptions, Offset, PixiParams, PixiSelector } from "src/modules/pixi/Pixi";
import { cardColor, cardImage, Dimensions, shadowCard } from "src/modules/pixi/PixiShapes";

export const PixiCardFactory = (options: CardOptions, chapter: Chapter, containerName: string) => {
    let innerCard: Container, 
        shadow: Container, 
        line: PixiSelector,
        offset: Offset;

    const containerPosition = chapter.getContainer(containerName).position;
    const card = positionCard(new Container(), options, containerPosition)
    card.zIndex = 10;
    card.visible = false;

    const setColorCard = (color: number) => {
        innerCard = cardColor(options, color);
        return factory;
    }

    const setImageCard = (image: Texture) => {
        innerCard = cardImage(options, image);
        return factory;
    }

    const addChild = (...sprite: DisplayObject[]) => {
        if (!innerCard) {
            throw new Error("You need to set card first before adding children");
        }
        innerCard.addChild(...sprite)
        return factory;
    }

    const elevate = (elevate: number) => {
        shadow = shadowCard(options, elevate)
        return factory;
    }

    const setOffset = (x: number, y: number) => {
        offset = { x, y }
        return factory;
    }

    const setLine = (previous: FlowComponent, color: number) => {
        line = ComponentLineSelector(previous, options, color);
        return factory;
    }

    const build = (): PixiParams => {
        if (shadow) {
            card.addChild(shadow)
        }

        card.addChild(innerCard);

        return {
            card: ComponentCardSelector(card, offset),
            containerName,
            line
        }
    }

    const factory = {
        setColorCard,
        setImageCard,
        addChild,
        elevate,
        setOffset,
        setLine,
        build
    }
 
    return factory;
}

const positionCard = (self: Container, options: CardOptions, containerPosition: Point): Container => {
    const { pivotCenter, x, y, width, height } = options;

    const newX = pivotCenter ? x - (width / 2): x;
    const newY = pivotCenter ? y - (height / 2): y;
    self.x = containerPosition.x + newX;
    self.y = containerPosition.y + newY;

    return self
};

