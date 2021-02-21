import { FlowComponent } from "src/components/base/FlowComponent";
import { pixiApp } from "src/pixi/PixiApp";
import { ActionSelector } from "src/utils/ActionTypes";
import { Selector } from "../selector/Selector";
import { Dimensions } from "./PixiShapes";

export class ComponentLine extends Selector {
    count = 0;
    curve = new PIXI.Graphics();
    endX: number;
    endY: number;
    color: number;

    constructor(previous: FlowComponent, dimensions: Dimensions, color: number) {
        super();
        this.color = color;

        const centerStart = getCenter(dimensions);
        const centerEnd = getCenter(previous.pixi.components.card);

        this.endX = centerEnd.x - centerStart.x
        this.endY = centerEnd.y - centerStart.y

        this.curve.position.set(centerStart.x, centerStart.y);
        this.curve.visible = false;

        const select = (): Promise<void> => {
            this.count = 0;
            pixiApp.ticker.add(delta => this.animate(delta));
            return;
        }

        const unselect = (action: ActionSelector): Promise<void> => {
            pixiApp.ticker.remove(this.animate);

            if (action === ActionSelector.PREVIOUS) {
                this.curve.visible = false;
            }
            return;
        }

        this.select = select;
        this.unselect = unselect;
    }


    // TODO create scale 
    // The bigger the distance the bigger the offset can be
    curveX1(): number {
        return this.endX / 2 + 50 + (50 * Math.sin(this.count))
    }

    curveY1(): number {
        return this.endY / 2 + 50 + (50 * Math.sin(this.count))
    }

    animate(delta: number) {
        this.count += (0.02 * delta)
        this.curve
            .clear()
            .lineTextureStyle({ 
                width: 4,
                color: this.color
            })
            .quadraticCurveTo(this.curveX1(), this.curveY1(), this.endX, this.endY);
    }
}

const getCenter = (dimensions: Dimensions): PIXI.Point => {
    const { width, x, y } = dimensions;
    const newX = x + (width / 2)
    const newY = y + 50;
    return new PIXI.Point(newX, newY)
}
