import { ChapterType } from "src/chapters/base/ChapterType";
import {PartLoader} from "src/modules/partChain/PartLoader";
import { LOG } from "src/utils/Logger";
import {FlowComponent} from "./FlowComponent";
import { PartTester, TestFlags } from "./PartTester";

const componentTags: Set<string> = new Set();

/* Partchain will immediately connect the complete chain
* @init / attachPrevious will be used for lazy loading */
export class PartChain {
    readonly previous: PartChain;
    readonly chapterType: ChapterType;
    readonly tag: string;
    readonly index: number;

    // Will be build in the factory.
    loader: PartLoader;
    testFlags: TestFlags;
    nextParts: PartChain[] = []; 

    isSuccessful = false;
    initialized = false;
    hasPreviousAttached = false;
    component: FlowComponent;

    constructor(tag: string, chapterType: ChapterType, previous: PartChain) {
        if (componentTags.has(tag)) {
            throw new Error('Component with this tag is already linked ' + tag);
        }
        componentTags.add(tag);

        this.index = previous?.index ? previous.index + 1 : 1;
        this.tag = tag;
        this.previous = previous;
        this.chapterType = chapterType;
    }

    init(): void {
        if (this.initialized) {
            return;
        }

        try {
            this.component = this.loader.buildComponent();
            PartTester(this);

            this.isSuccessful = true;
        } catch (error) {
            LOG.error('Component not added', error, this);
            this.isSuccessful = false;

            LOG.debugChain(this);
        } finally {
            this.initialized = true;
        }
    }

    attachPrevious() {
        const previous = this.previousValid?.component;
        if (previous && this.isSuccessful && !this.hasPreviousAttached) {
            this.loader.attachPreviousComponent(previous);
            this.hasPreviousAttached = true;
        }
    }

    get hasPrevious(): boolean {
        if (this.previous) {
            return true;
        } else {
            return false;
        }
    }

    get hasNext(): boolean {
        return this.nextParts.length > 0;
    }

    get previousValid(): PartChain {
        if (this.previous) {
            if (this.previous.isSuccessful) {
                return this.previous;
            }

            return this.previous.previousValid;
        }  
    }
}
