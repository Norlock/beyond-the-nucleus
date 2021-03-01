import { FLOW_SELECTOR_TAG } from "src/modules/selector/MergeFlowSelector";
import { Selector } from "src/modules/selector/Selector";
import { assert } from "src/utils/Assertions";
import { LOG } from "src/utils/Logger";
import { FlowComponent } from "./FlowComponent";

export interface TestFlags {
    hasPrevious: boolean;
    hasLine: boolean;

    // If strict it will throw an error
    strict: boolean;
}

export const defaultTestFlags = (): TestFlags => {
    return {
        hasPrevious: true,
        hasLine: true,
        strict: false
    }
}

// TODO check if nextparts ook echt next parts
export const PartTester = (component: Readonly<FlowComponent>, flags: TestFlags): boolean => {
    const { hasPrevious, hasLine } = flags;

    if (hasPrevious) {
        if(assert.isDefined(component.mover.previous)) {
            LOG.error('No previous', component);
            return false;
        }   
    }

    component.selector.tag = "juustem";
    if (!component.chapter) {
        LOG.error('No chapter', component);
    }

    if (hasLine) {

    }

    return true;
}

const testSelectors = (component: Readonly<FlowComponent>): boolean => {
    if (!component.selector) {
        LOG.error('No selector', component);
        return false;
    }
    const selector: Readonly<Selector> = component.selector;

    if (selector.tag !== FLOW_SELECTOR_TAG) {
        LOG.error('Expects flow selector', component);
        return false;
    }

}
