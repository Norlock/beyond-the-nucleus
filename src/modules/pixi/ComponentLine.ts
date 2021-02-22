import { FlowComponent } from "src/components/base/FlowComponent";
import { SelectorFactory } from "src/factories/SelectorFactory";
import { pixiApp } from "src/pixi/PixiApp";
import { ActionSelector } from "src/utils/ActionTypes";
import { Selector } from "../selector/Selector";
import { Dimensions } from "./PixiShapes";

export const ComponentLine = (previous: FlowComponent, dimensions: Dimensions, color: number): Selector => {
    let count = 0;
    const curve = new PIXI.Graphics();

    const centerStart = getCenter(dimensions);
    const centerEnd = getCenter(previous.pixi.components.card);

    const endX = centerEnd.x - centerStart.x
    const endY = centerEnd.y - centerStart.y

    curve.position.set(centerStart.x, centerStart.y);
    curve.visible = false;

    // TODO create scale 
    // The bigger the distance the bigger the offset can be
    const curveX1 = (): number => {
        return endX / 2 + 50 + (50 * Math.sin(count))
    }

    const curveY1 = (): number => {
        return endY / 2 + 50 + (50 * Math.sin(count))
    }

    const animate = (delta: number) => {
        count += (0.02 * delta)
        curve
            .clear()
            .lineTextureStyle({ 
                width: 4,
                color
            })
            .quadraticCurveTo(curveX1(), curveY1(), endX, endY);
    }

    const select = (): Promise<void> => {
        count = 0;
        pixiApp.ticker.add(delta => animate(delta));
        return;
    }

    const unselect = (action: ActionSelector): Promise<void> => {
        pixiApp.ticker.remove(animate);

        if (action === ActionSelector.PREVIOUS) {
            curve.visible = false;
        }
        return;
    }

    return SelectorFactory(new Selector())
        .setSelect(select)
        .setUnselect(unselect)
        .build();
}

const getCenter = (dimensions: Dimensions): PIXI.Point => {
    const { width, x, y } = dimensions;
    const newX = x + (width / 2)
    const newY = y + 50;
    return new PIXI.Point(newX, newY)
}
