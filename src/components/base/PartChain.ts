import { Chapter } from "src/chapters/base/Chapter";
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
            this.component = this.buildComponent(this.chapter, this.previous?.component);
            this.isSuccessful = true;            
            this.nextParts = this.getNextParts(this.chapter, this);
        } catch (error) {
            this.isSuccessful = false;
            this.nextParts = this.getNextParts(this.chapter, this.previousValid());
        }
    }

    nextValid(): PartChain {
        if (this.isSuccessful) {
            return this;
        }

        // In case of branches (TODO) you can have multiple next parts.
        for (let next of this.nextParts) {
            const nextValid = next.nextValid();
            if (nextValid) {
                return nextValid;
            }
        }
    }

    previousValid(): PartChain {
        if(this.isSuccessful) {
            return this;
        }

        if (!this.isRoot()) {
            return this.previous.previousValid();
        } else {
            return undefined;
        }
    }

    nextInvalid(): PartChain {
        if (!this.isSuccessful) {
            return this;
        }

        // In case of branches (TODO) you can have multiple next parts.
        for (let next of this.nextParts) {
            const nextInvalid = next.nextInvalid();
            if (nextInvalid) {
                return nextInvalid;
            }
        }
    }

    isRoot(): boolean {
        return typeof this.previous === 'undefined';
    }
}
