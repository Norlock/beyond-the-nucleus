import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { StaticComponent } from 'src/components/base/StaticComponent';
import { MergeStaticMover } from 'src/modules/mover/MergeStaticMover';
import { MergeStaticSelector } from 'src/modules/selector/MergeStaticSelector';
import { MergeUI } from 'src/modules/ui/GetUI';
import { ActionSelector } from 'src/utils/ActionTypes';

export const StaticComponentFactory = (chapter: Chapter, tag: string) => {
    const self = new StaticComponent(chapter);
    self.tag = tag;
    MergeUI(self);
    MergeStaticSelector(self);

    const mergeMover = (parent: FlowComponent, action: ActionSelector) => {
        MergeStaticMover(self, parent, action);
        return factory;
    };

    const factory = {
        component: self,
        mergeMover,
    };

    return factory;
};
