import { ContainerSelector } from 'src/chapters/base/ContainerSelector';
import { ActionType } from 'src/utils/ActionTypes';

abstract class BaseSelector {
    isSelected: boolean;
    unselect: Unselect;
    next: Selector;

    appendSelector(selector: Selector): void {
        if (!this.next) {
            this.next = selector;
        } else {
            this.next.appendSelector(selector);
        }
    }
}

export class Selector extends BaseSelector {
    select: Select;
}

export class ChapterSelector extends BaseSelector {
    containerSelector = new ContainerSelector();
    select: ChapterSelect;
}

export type Select = (action?: ActionType) => Promise<void>;
export type ChapterSelect = (containerName: string) => Promise<void>;
export type Unselect = (action?: ActionType) => Promise<void>;

export interface SelectorModule {
    selector: BaseSelector;
}
