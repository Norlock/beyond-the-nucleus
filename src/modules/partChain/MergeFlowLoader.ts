import {ChapterProvider} from 'src/chapters/base/ChapterProvider';
import {FlowComponent} from 'src/components/base/FlowComponent';
import { PartChain } from 'src/components/base/PartChain';
import {FlowComponentFactory} from 'src/factories/FlowComponentFactory';
import {AttachPreviousFunction, BuildFunction} from './PartLoader';

export const MergeFlowLoader = (
    self: PartChain, 
    buildFunction: BuildFunction, 
    attachPreviousFunction: AttachPreviousFunction) => {

    const chapter = ChapterProvider.get(self.chapterType);
    const factory = new FlowComponentFactory(chapter, self.tag)
        .mergeMover(self.index);

    let attachPreviousComponent: any;

    if (attachPreviousFunction) {
        attachPreviousComponent = (previous: FlowComponent) => attachPreviousFunction(factory, previous);
    } else {
        attachPreviousComponent = () => {};
    }

    self.loader = {
        buildComponent: () => buildFunction(factory),
        attachPreviousComponent
    }
}
