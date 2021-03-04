import { FlowComponent } from "src/components/base/FlowComponent";
import { ComponentLineSelector } from "src/modules/pixi/ComponentLine";

const PixiLineFactory = (self: FlowComponent, previous: FlowComponent, color: number) => {
    //const dimensions: Dimensions = {
        //width: options.width,
        //height: options.height,
        //x: containerPosition.x + options.x,
        //y: containerPosition.y + options.y
    //}

    return ComponentLineSelector(previous, self.pixi.card, color);
}
