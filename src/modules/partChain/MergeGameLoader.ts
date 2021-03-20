import {ChapterProvider} from 'src/chapters/base/ChapterProvider';
import {FlowComponent} from 'src/components/base/FlowComponent';
import { PartChain } from 'src/components/base/PartChain';
import {GameComponentFactory} from 'src/factories/GameComponentFactory';
import {AttachPreviousFunction, BuildFunction} from './PartLoader';

export const MergeGameLoader = (
    self: PartChain, 
    buildComponentFunction: BuildFunction, 
    attachPreviousComponentFunction: AttachPreviousFunction) => {

    const chapter = ChapterProvider.get(self.chapterType);
    const factory = new GameComponentFactory(chapter, self.tag)
        .mergeMover(self.index);

    self.loader.buildComponent = () => buildComponentFunction(factory);
    self.loader.attachPreviousComponent = (previous: FlowComponent) => attachPreviousComponentFunction(factory, previous);
}
