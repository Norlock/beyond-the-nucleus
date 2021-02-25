import { Chapter } from "src/chapters/base/Chapter";
import { LOG } from "src/utils/Logger";
import { FlowComponent } from "./FlowComponent";

export abstract class PartChain {
    readonly previous: PartChain;
    readonly chapter: Chapter;

    abstract buildComponent(chapter: Chapter, previous: FlowComponent): FlowComponent;
    abstract getNextParts(chapter: Chapter, partToLink: PartChain): PartChain[];

    isSuccessful: boolean;
    component: FlowComponent;
    nextParts: PartChain[]; 

    constructor(chapter: Chapter, previous: PartChain) {
        this.previous = previous;
        this.chapter = chapter;
    }

    init() {
        try {
            this.component = this.buildComponent(this.chapter, this.previousValid?.component);
            this.nextParts = this.getNextParts(this.chapter, this);
            this.isSuccessful = true;            
        } catch (error) {
            this.isSuccessful = false;
            this.nextParts = this.getNextParts(this.chapter, this.previousValid);
            LOG.error('Part chain broke', error, this);
        }  
    }

    get index(): number {
        return this.component.mover.index;
    }

    get previousValid(): PartChain {
        if(this.isSuccessful) {
            return this;
        }

        if (!this.isRoot()) {
            return this.previous.previousValid;
        } else {
            return undefined;
        }
    }

    isRoot(): boolean {
        return typeof this.previous === 'undefined';
    }
}
