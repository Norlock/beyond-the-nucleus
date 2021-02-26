import { Chapter } from 'src/chapters/base/Chapter';
import { FlowComponent } from 'src/components/base/FlowComponent';
import { MergeFlowMover } from 'src/modules/mover/MergeFlowMover';
import { MergeFlowPixi } from 'src/modules/pixi/MergeFlowPixi';
import { PixiParams } from 'src/modules/pixi/Pixi';
import { MergeFlowSelector } from 'src/modules/selector/MergeFlowSelector';
import { Selector } from 'src/modules/selector/Selector';
import { MergeUI } from 'src/modules/ui/GetUI';

export const FlowComponentFactory = (chapter: Chapter, tag: string) => {
    if (componentTags.includes(tag)) {
        throw new Error('component already linked ' + tag);
    }
    componentTags.push(tag);

    const self = new FlowComponent(chapter);
    self.tag = tag;
    MergeUI(self);
    MergeFlowSelector(self);

    const mergeMover = (previous: FlowComponent) => {
        MergeFlowMover(self, previous);
        return factory
    };

    const mergePixi = (params: PixiParams) => {
        MergeFlowPixi(self, params);
        return factory
    };

    const build = (): FlowComponent => {
        return self;
    }

    const factory = {
        mergeMover,
        mergePixi,
        build
    };

    return factory;
};

const componentTags: string[] = [];
