import { ChapterType } from "src/chapters/base/ChapterType";
import { PartChain } from "src/components/base/PartChain";
import { TestFlags } from "src/components/base/PartTester";
import {MergeFlowLoader} from "src/modules/partChain/MergeFlowLoader";
import {MergeGameLoader} from "src/modules/partChain/MergeGameLoader";
import {AttachPreviousFunction, BuildFunction} from "src/modules/partChain/PartLoader";
import {LOG} from "src/utils/Logger";
import {GameComponentFactory} from "./GameComponentFactory";

type PartCreator = (part: PartChain) => PartChain;

export const PartChainFactory = (tag: string, chapterType: ChapterType, previous: PartChain) => {
    const self = new PartChain(tag, chapterType, previous);

    const mergeFlowLoader = (buildComponentFunction: BuildFunction, attachPreviousComponentFunction: AttachPreviousFunction) => {
        if (self.loader) {
            LOG.error("Either use flow loader or game loader");
        }

        MergeFlowLoader(self, buildComponentFunction, attachPreviousComponentFunction);
        return factory;
    }

    const mergeGameLoader = (buildComponentFunction: BuildComponentFunction, attachPreviousComponentFunction: AttachPreviousComponentFunction) => {
        if (self.loader) {
            LOG.error("Either use flow loader or game loader");
        }

        const gameFactory = new GameComponentFactory(chapter, tag)
            .mergeMover(self.index);

        MergeGameLoader(self, gameFactory,  buildComponentFunction, attachPreviousComponentFunction);
        return factory;
    }

    const setTestFlags = (flags: TestFlags) => {
        self.testFlags = flags;
        return factory;
    }

    const setNextParts = (...nextPartCreators: PartCreator[]) => {
        nextPartCreators.forEach(partCreator => {
            self.nextParts.push(partCreator(self))
        });

        return factory;
    }

    const build = () => {
        return self;
    }

    const factory = {
        mergeFlowLoader,
        mergeGameLoader,
        setTestFlags,
        setNextParts,
        build
    }

    return factory;
}
