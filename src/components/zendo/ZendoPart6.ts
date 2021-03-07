import { ChapterType } from "src/chapters/base/ChapterType";
import { FlowComponentFactory } from "src/factories/FlowComponentFactory";
import { FlowComponent } from "../base/FlowComponent";
import { PartChain } from "../base/PartChain";
import { TestFlags } from "../base/PartTester";

export class ZendoPart6 extends PartChain {
    constructor(previous: PartChain) {
        super("Zendo6", ChapterType.ZEN, previous)
    }

    buildComponent(factory: FlowComponentFactory): void {
        component(factory);
    }

    getNextParts(): PartChain[] {
        return [];
    }

    attachPreviousComponent(factory: FlowComponentFactory, previous: FlowComponent): void {
        factory.mergePrevious(previous);
    }

    getTestFlags(standard: TestFlags): TestFlags {
        standard.hasLine = false;
        return standard;
    }
}

const component = (factory: FlowComponentFactory): void => {

}
