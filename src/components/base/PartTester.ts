import { FLOW_SELECTOR_TAG } from "src/modules/selector/MergeFlowSelector";
import { Selector } from "src/modules/selector/Selector";
import { LOG } from "src/utils/Logger";
import { FlowComponent } from "./FlowComponent";

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
export const PartTester = (component: Readonly<FlowComponent>, flags: TestFlags): void => {
    const { hasPrevious, hasLine } = flags;

    if (hasPrevious) {
        if(!component.mover.previous) {
            throw new Error("Doesn't have a previous");
        }   
    }

    if (!component.chapter) {
        throw new Error("Doesn't have a chapter");
    }

    if (hasLine) {
        if (!component.pixi.line) {
            throw new Error("Doesn't have a line");
        }

    }

    const testSelectors = (selector: Readonly<Selector>): void => {
        if (!selector) {
            throw new Error("Doesn't have a selector");
        }

        if (selector.tag !== FLOW_SELECTOR_TAG) {
            throw new Error('Expects flow selector');
        }
    }

    testSelectors(component.selector);
}

