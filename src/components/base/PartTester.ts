import { Dimensions } from "src/modules/pixi/PixiShapes";
import { assert } from "src/utils/Assertions";
import { FlowComponent } from "./FlowComponent";

export interface TestFlags {
    hasPrevious: boolean;
    nextCount: number;
    hasBezier: boolean;
    dimensions: Dimensions;
}

// TODO check if nextparts ook echt next parts
export const PartTester = (component: FlowComponent, flags: TestFlags): boolean => {
    const { hasPrevious, nextCount, dimensions, hasBezier } = flags;

    if (hasPrevious) {
        if(assert.isDefined(component.mover.previous)) {
            console.error('No previous', component.tag);
            return false;
        }   
    }

    if (nextCount > 0) {

    }

    if (dimensions) {

    }

    if (hasBezier) {

    }

    return true;
}
