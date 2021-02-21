import { Container, DisplayObject } from "pixi.js";
import { Offset, PixiParams } from "src/modules/pixi/Pixi";

export const CustomPixiFactory = (background: Container, containerName: string) => {
    let card: Container, 
        offset: Offset;

    const setCard = (customCard: Container) => {
        card = positionCard(customCard, background);
        card.zIndex = 10;
        card.visible = false;
        return factory;
    }

    const addChild = (...sprite: DisplayObject[]) => {
        if (!self) {
            throw new Error("You need to set card first before adding children");
        }
        card.addChild(...sprite)
        return factory;
    }

    const setOffset = (x: number, y: number) => {
        offset = { x, y }
        return factory;
    }

    const build = (): PixiParams => {
        const params = new PixiParams();
        params.containerName = containerName;
        params.components = { card, offset } 
        return params;
    }

    const factory = {
        setCard,
        addChild,
        setOffset,
        build
    }

    return factory;
}

const positionCard = (self: Container, background: Container): Container => {
    self.x = background.x + self.x;
    self.y = background.y + self.y;
    return self
};
