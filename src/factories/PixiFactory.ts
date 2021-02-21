import { Container, DisplayObject, Point, Texture } from "pixi.js"
import { Chapter } from "src/chapters/base/Chapter";
import { FlowComponent } from "src/components/base/FlowComponent";
import { CardOptions, Offset, PixiParams } from "src/modules/pixi/Pixi";
import { cardColor, cardImage, drawBezier, shadowCard } from "src/modules/pixi/PixiShapes";

export const PixiFactory = (options: CardOptions, chapter: Chapter, containerName: string) => {
    let innerCard: Container, 
        shadow: Container, 
        offset: Offset,
        bezier: Container;

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

    const setBezier = (previous: FlowComponent, color: number) => {
        if (!innerCard) {
            throw new Error("You need to set card first before adding bezier");
        }

        bezier = drawBezier(previous, {
            x: card.x,
            y: card.y,
            width: innerCard.width,
            height: innerCard.height
        }, color);

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

    const build = (): PixiParams => {
        if (shadow) {
            card.addChild(shadow)
        }

        card.addChild(innerCard);

        const params = new PixiParams();
        params.containerName = containerName;

        if (bezier) {
            params.components = { card, bezier, offset }
        } else {
            params.components = { card, offset }
        }

        return params;
    }

    const factory = {
        setColorCard,
        setImageCard,
        addChild,
        setBezier,
        elevate,
        setOffset,
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

