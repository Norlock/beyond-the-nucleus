import { ContainerSelector } from 'src/chapters/base/ContainerSelector';
import { ActionSelector } from 'src/utils/ActionTypes';

export class Selector {
    tag: string; // Tag for debug readability
    isSelected: boolean;
    unselect: Unselect;
    next: Selector;
    select: Select;

    constructor(tag: string) {
        this.tag = tag;
    }

    appendSelector(selector: Selector): void {
        if (!this.next) {
            this.next = selector;
        } else {
            this.next.appendSelector(selector);
        }
    }

    // Select first one first
    async recursivelySelect(action: ActionSelector) {
        await this.select(action);
        this.next?.select(action);
    }

    // Unselect last one first
    async recursivelyUnselect(action: ActionSelector) {
        this.next?.recursivelyUnselect(action);
        await this.unselect(action);
    }
}

export class ChapterSelector extends Selector {
    containerSelector = new ContainerSelector();
    select: ChapterSelect;
}

export type Select = (action?: ActionSelector) => Promise<void>;
export type ChapterSelect = (containerName: string) => Promise<void>;
export type Unselect = (action?: ActionSelector) => Promise<void>;

export interface SelectorModule {
    selector: Selector;
}
