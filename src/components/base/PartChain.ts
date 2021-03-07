import { ChapterProvider } from "src/chapters/base/ChapterProvider";
import { ChapterType } from "src/chapters/base/ChapterType";
import { FlowComponentFactory } from "src/factories/FlowComponentFactory";
import { LOG } from "src/utils/Logger";
import { FlowComponent } from "./FlowComponent";
import { defaultTestFlags, PartTester, TestFlags } from "./PartTester";

const componentTags: Set<string> = new Set();
type BuildComponent = () => (factory: FlowComponentFactory) => void;
type AttachPreviousComponent = () => (factory: FlowComponentFactory) => void;

/* Partchain will immediately connect the complete chain
* @init / attachPrevious will be used for lazy loading
    */
export abstract class PartChain {
    readonly previous: PartChain;
    readonly testFlags: TestFlags;
    readonly chapterType: ChapterType;
    readonly tag: string;
    readonly index: number;
    readonly debug: () => void;

    // Will be build in the factory.
    factory: FlowComponentFactory;
    buildComponent: BuildComponent;
    attachPreviousComponent: AttachPreviousComponent;

    abstract getNextParts(): PartChain[];
    abstract getTestFlags(standard: TestFlags): TestFlags;

    isSuccessful = false;
    initialized = false;
    hasPreviousAttached = false;
    nextParts: PartChain[] = []; 

    constructor(tag: string, chapterType: ChapterType, previous: PartChain) {
        if (componentTags.has(tag)) {
            throw new Error('Component with this tag is already linked ' + tag);
        }
        componentTags.add(tag);

        this.index = previous?.index ? previous.index + 1 : 1;
        this.tag = tag;
        this.previous = previous;
        this.chapterType = chapterType;
        this.nextParts = this.getNextParts();

        this.debug = () => debugChain(this);
        this.testFlags = this.getTestFlags(defaultTestFlags());
    }

    init() {
        if (this.initialized) {
            return;
        }

        const chapter = ChapterProvider.get(this.chapterType);
        this.factory = new FlowComponentFactory(chapter, this.tag)
            .mergeMover(this.index);

        try {
            this.buildComponent(this.factory);
            PartTester(this);

            this.isSuccessful = true;
        } catch (error) {
            LOG.error('Component not added', error, this);
            this.isSuccessful = false;

            this.debug();
        } finally {
            this.initialized = true;
        }
    }

    attachPrevious() {
        const previous = this.previousValid?.component;
        if (previous && this.isSuccessful && !this.hasPreviousAttached) {
            this.attachPreviousComponent(this.factory, previous);
            this.hasPreviousAttached = true;
        }
    }

    get component(): FlowComponent {
        return this.factory.component;
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

const debugChain = (self: PartChain): void => {
    const previousParts = (current: PartChain): PartChain [] => {
        const list: PartChain[] = [];
        while (current.previous) {
            list.push(current.previous);
            current = current.previous;
        }
        return list;
    }

    const nextParts = (current: PartChain, list: PartChain[][]): PartChain [][] => {
        if (current.nextParts.length > 0) {
            list.push(current.nextParts);

            for (let next of current.nextParts) {
                nextParts(next, list);
            }
        }

        return list;
    }

    LOG.log('Previous', previousParts(self));
    LOG.log('Current', self);
    LOG.log('Next', nextParts(self, []));
}
