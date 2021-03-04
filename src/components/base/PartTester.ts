import { Selector, StandardSelectorTag } from "src/modules/selector/Selector";
import { LOG } from "src/utils/Logger";
import { FlowComponent } from "./FlowComponent";
import { PartChain } from "./PartChain";

export interface TestFlags {
    hasPrevious: boolean;
    hasLine: boolean;
    nextCount: number;
}

export const defaultTestFlags = (): TestFlags => {
    return {
        hasPrevious: true,
        hasLine: true,
        nextCount: 0
    }
}

// TODO complete readonly object
export const PartTester = (part: Readonly<PartChain>): void => {
    const { hasPrevious, hasLine } = part.testFlags;
    const component: Readonly<FlowComponent> = part.component;

    if (!component.chapter) {
        throw new Error("Doesn't have a chapter");
    }

    //if (hasPrevious && part.previousValid) {
        //if(!component.mover.previous) {
            //throw new Error("Doesn't have a previous");
        //}   

        //if (hasLine) {
            //if (!component.pixi.line) {
                //throw new Error("Doesn't have a line");
            //}
        //}
    //}


    const testSelectors = (selector: Readonly<Selector>): void => {
        if (!selector) {
            throw new Error("Doesn't have a selector");
        }

        if (selector.tag !== StandardSelectorTag.FLOW) {
            throw new Error('Expects flow selector');
        }
        // TODO check if order is correct
    }

    testSelectors(component.selector);
}

