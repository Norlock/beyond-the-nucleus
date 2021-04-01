import {ChapterProvider} from 'src/chapters/base/ChapterProvider';
import {FlowComponent} from 'src/components/base/FlowComponent';
import { PartChain } from 'src/components/base/PartChain';
import {GameComponentFactory} from 'src/factories/GameComponentFactory';
import {AttachPreviousFunction, BuildFunction} from './PartLoader';

export const MergePartChainGameLoader = (
    self: PartChain, 
    buildFunction: BuildFunction, 
    attachPreviousFunction: AttachPreviousFunction) => {

    const chapter = ChapterProvider.get(self.chapterType);
    const factory = new GameComponentFactory(chapter, self.tag)
        .mergeMover(self.index);

    self.loader = {
        buildComponent: () => buildFunction(factory),
        attachPreviousComponent: (previous: FlowComponent) => attachPreviousFunction(factory, previous)
    }
}
