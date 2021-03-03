import { Chapter } from "src/chapters/base/Chapter";
import { ChapterProvider } from "src/chapters/base/ChapterProvider";
import { ChapterType } from "src/chapters/base/ChapterType";
import { LOG } from "src/utils/Logger";
import { FlowComponent } from "./FlowComponent";
import { defaultTestFlags, PartTester, TestFlags } from "./PartTester";

/* Partchain will immediately connect the complete chain
* @init will be used for lazy loading
    */
export abstract class PartChain {
    readonly previous: PartChain;
    readonly testFlags: TestFlags;
    readonly chapterType: ChapterType;
    readonly tag: string;
    readonly debug: () => void;

    abstract buildComponent(chapter: Chapter, previous: FlowComponent, tag: string): FlowComponent;
    abstract getNextParts(): PartChain[];
    abstract getTestFlags(standard: TestFlags): TestFlags;

    isSuccessful: boolean;
    initialized: boolean;
    component: FlowComponent;
    nextParts: PartChain[] = []; 

    constructor(tag: string, chapterType: ChapterType, previous: PartChain) {
        this.tag = tag;
        this.previous = previous;
        this.chapterType = chapterType;
        this.nextParts = this.getNextParts();

        this.debug = () => debugChain(this);
    }

    init() {
        const chapter = ChapterProvider.get(this.chapterType);
        const previous = this.previousValid?.component;

        try {
            this.component = this.buildComponent(chapter, previous, this.tag);

            const flags = this.getTestFlags(defaultTestFlags());
            PartTester(this.component, flags);

            this.isSuccessful = true;
        } catch (error) {
            this.isSuccessful = false;
            previous.mover.nextNodes.remove(this.component);

            LOG.error('Component not added', error, this);
            this.debug();
        } finally {
            this.initialized = true;
        }
    }

    get index(): number {
        return this.component.mover.index;
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
