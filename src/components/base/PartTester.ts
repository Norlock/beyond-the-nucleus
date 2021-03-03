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
export const PartTester = (component: Readonly<FlowComponent>, flags: TestFlags): boolean => {
    const { hasPrevious, hasLine } = flags;
    let success = true;

    if (hasPrevious) {
        if(!component.mover.previous) {
            LOG.error('No previous', component);
            success = false;
        }   
    }

    if (!component.chapter) {
        LOG.error('No chapter', component);
        success = false;
    }

    if (hasLine) {
        if (!component.pixi.line) {
            LOG.error('No line', component);
            success = false;
        }

    }

    const testSelectors = (selector: Readonly<Selector>): boolean => {
        if (!selector) {
            LOG.error('No selector', component);
            return false;
        }

        if (selector.tag !== FLOW_SELECTOR_TAG) {
            LOG.error('Expects flow selector', component);
            return false;
        }
    }
    testSelectors(component.selector);

    return success;
}

