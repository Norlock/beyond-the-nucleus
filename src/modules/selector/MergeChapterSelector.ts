import * as PIXI from 'pixi.js';
import { Chapter } from 'src/chapters/base/Chapter';
import { ChapterSelectorFactory } from 'src/factories/ChapterSelectorFactory';
import { pixiApp } from 'src/pixi/PixiApp';
import { ActionSelector } from 'src/utils/ActionTypes';
import { UIUtils } from '../ui/GetUI';
import { ChapterSelector } from './Selector';

export const MergeChapterSelector = (self: Chapter): void => {
    const selector = new ChapterSelector("Chapter selector base");

    const select = async (containerName: string) => {
        if (!selector.isSelected) {
            selector.isSelected = true;
            self.root.visible = true;
            UIUtils.setChapterTitle(self.title);

            selector.next?.select();
            self.root.updateTransform();
        }

        selector.containerSelector.select(containerName);
    };

    const unselect = async (action: ActionSelector) => {
        if (selector.isSelected) {
            selector.isSelected = false;
            selector.next?.unselect(action);

            return new Promise<void>(resolve => hideAnimation(self.root, resolve));
        }
    };

    self.selector = ChapterSelectorFactory(selector)
        .setSelect(select)
        .setUnselect(unselect)
        .build();
};

const hideAnimation = (root: PIXI.Container, resolve: Function) => {
    const hideChapter = (): void => {
        if (root.alpha > 0) {
            root.alpha -= 0.05;
        } else {
            pixiApp.ticker.remove(hideChapter);
            root.visible = false;
            root.alpha = 1;
            resolve();
        }
    };

    pixiApp.ticker.add(hideChapter);
}
