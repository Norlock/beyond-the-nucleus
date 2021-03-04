import { ContainerSelector } from 'src/chapters/base/ContainerSelector';
import { ActionSelector } from 'src/utils/ActionTypes';

export enum StandardSelectorTag {
    FLOW = 'flow',
    CARD = 'card',
    LINE = 'line'
}

export class Selector {
    tag: string; // Tag for debug readability
    isSelected: boolean;
    next: Selector;
    select: Select;
    unselect: Unselect;

    constructor(tag: string) {
        this.tag = tag;
    }

    append(selector: Selector): void {
        if (!this.next) {
            this.next = selector;
        } else {
            this.next.append(selector);
        }
    }

    insertBefore(selector: Selector, tag: string): void {
        if (this.next?.tag === tag) {
            selector.next = this.next;
            this.next = selector;
        } else {
            this.next?.insertBefore(selector, tag)
        }
    }

    insertAfter(selector: Selector, tag: string): void {
        if (this.tag === tag) {
            selector.next = this.next;
            this.next = selector;
        } else {
            this.next?.insertAfter(selector, tag)
        }
    }

    // Select first one first
    async recursivelySelect(action: ActionSelector): Promise<void> {
        await this.select(action);
        await this.next?.recursivelySelect(action);
    }

    // Unselect last one first
    async recursivelyUnselect(action: ActionSelector): Promise<void> {
        await this.next?.recursivelyUnselect(action);
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
